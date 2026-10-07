#!/usr/bin/env node

/**
 * LexicalLayer Zero-Config Agent & LoRA Engine CLI
 * 
 * Invoked via:
 *   npx lexicallayer
 *   npx lexicallayer calibrate
 *   npx lexicallayer train [path-to-files]
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { exec, spawn, execSync } = require("child_process");

const SERVER_PORT = 8001;
const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`;
const STUDIO_URL = "https://lexicallayer.muhammetatmaca.com.tr/studio";
const REPO_ROOT = path.resolve(__dirname, "..");

function log(msg) {
  process.stdout.write(`\x1b[36m[LexicalLayer]\x1b[0m ${msg}\n`);
}

function success(msg) {
  process.stdout.write(`\x1b[32m✓ ${msg}\x1b[0m\n`);
}

function warn(msg) {
  process.stdout.write(`\x1b[33m! ${msg}\x1b[0m\n`);
}

function error(msg) {
  process.stdout.write(`\x1b[31m✗ ${msg}\x1b[0m\n`);
}

function pingServer() {
  return new Promise((resolve) => {
    const req = http.get(`${SERVER_URL}/api/health`, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => {
        try {
          const json = JSON.parse(body);
          resolve(json.status === "operational");
        } catch {
          resolve(false);
        }
      });
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

function postJSON(urlPath, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const req = http.request(
      `${SERVER_URL}${urlPath}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch {
            resolve({ raw: body });
          }
        });
      }
    );
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

function getJSON(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${SERVER_URL}${urlPath}`, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve({ raw: body });
        }
      });
    }).on("error", reject);
  });
}

function openBrowser(url) {
  if (process.platform === "win32") {
    exec(`powershell.exe -NoProfile -Command "Start-Process '${url}'"`);
  } else if (process.platform === "darwin") {
    exec(`open "${url}"`);
  } else {
    exec(`xdg-open "${url}"`);
  }
}

function findPython() {
  const candidates = [
    "python",
    "python3",
    "py",
    process.env.PYTHON_PATH,
  ].filter(Boolean);

  for (const cmd of candidates) {
    try {
      const ver = execSync(`${cmd} --version`, { stdio: "pipe" }).toString();
      if (ver.toLowerCase().includes("python 3")) {
        return cmd;
      }
    } catch {}
  }
  return null;
}

async function ensurePythonRuntime() {
  log("Donanım ve Python çalışma ortamı taranıyor...");
  const pyCmd = findPython();
  if (!pyCmd) {
    warn("Sisteminizde Python 3 bulunamadı.");
    log("Otomatik izole Python motoru yapılandırılıyor...");
    return null;
  }

  // Check CUDA / Accelerator availability
  try {
    const probeScript = "import torch; c=torch.cuda.is_available(); dev=torch.cuda.get_device_name(0) if c else 'CPU'; print(f'DEVICE:{dev}|CUDA:{c}')";
    const probe = execSync(`${pyCmd} -c "${probeScript}"`, {
      stdio: "pipe",
    }).toString().trim();

    const match = probe.match(/DEVICE:(.*?)\|/);
    const devName = match ? match[1] : "CPU";
    success(`Hesaplama Birimi: \x1b[33m${devName}\x1b[0m`);
  } catch (err) {
    // If torch missing, install silently
    try {
      log("PyTorch kütüphanesi yapılandırılıyor...");
      execSync(`${pyCmd} -m pip install torch transformers peft fastapi uvicorn pypdf python-docx`, {
        stdio: "inherit",
      });
      success("Gerekli sinir ağı kütüphaneleri kuruldu.");
    } catch {}
  }

  return pyCmd;
}

async function ensureDaemonRunning(pyCmd) {
  const isRunning = await pingServer();
  if (isRunning) {
    success(`LexicalLayer Yerel LoRA Motoru devrede (Port ${SERVER_PORT}).`);
    return true;
  }

  log("Yerel LoRA Eğitim & Inference Motoru arka planda başlatılıyor...");
  const serverScript = path.join(REPO_ROOT, "engine", "server.py");

  const child = spawn(pyCmd || "python", ["-m", "engine.server"], {
    cwd: REPO_ROOT,
    detached: true,
    stdio: "ignore",
  });
  child.unref();

  // Wait for health endpoint
  let attempts = 0;
  while (attempts < 25) {
    await new Promise((r) => setTimeout(r, 800));
    const ok = await pingServer();
    if (ok) {
      success(`LoRA Daemon başarıyla ayağa kaldırıldı (${SERVER_URL}).`);
      return true;
    }
    attempts++;
    process.stdout.write(".");
  }

  error("Daemon başlatılamadı. Lütfen 'python -m engine.server' komutunu kontrol edin.");
  return false;
}

async function configureLocalAgentConfigs(adapterName) {
  // Automatically configure Cursor and local rules
  const homeDir = process.env.USERPROFILE || process.env.HOME || "";
  const cursorRulesDir = path.join(process.cwd(), ".cursor", "rules");
  try {
    if (!fs.existsSync(cursorRulesDir)) {
      fs.mkdirSync(cursorRulesDir, { recursive: true });
    }
    const ruleFile = path.join(cursorRulesDir, "lexicallayer.mdc");
    const ruleContent = `---
description: LexicalLayer Steered Representation Layer
globs: *
---
# LexicalLayer Active Steered Representation Layer
- Local OpenAI Gateway: ${SERVER_URL}/v1
- Model Name: lexicallayer-steered-model
- Active Weights: ${adapterName}
- Slop & Cliches: STRICTLY FORBIDDEN. Respond directly in user's authentic tone and vocabulary.
`;
    fs.writeFileSync(ruleFile, ruleContent, "utf-8");
    success(`Cursor kuralı oluşturuldu: .cursor/rules/lexicallayer.mdc`);
  } catch {}
}

async function main() {
  console.log("\n\x1b[1m\x1b[36m=== LexicalLayer Cognitive Representation Layer ===\x1b[0m\n");

  const pyCmd = await ensurePythonRuntime();
  const daemonReady = await ensureDaemonRunning(pyCmd);
  if (!daemonReady) {
    process.exit(1);
  }

  log("Agent oturumu başlatılıyor...");
  const sessionInitPayload = {
    agent_name: "local-agent",
    email: "developer@local.workspace",
  };

  try {
    const initRes = await postJSON("/api/session/init", sessionInitPayload);
    const sessionId = initRes.session ? initRes.session.id : `lx_sess_${Date.now()}`;
    const targetUrl = `${STUDIO_URL}?session=${sessionId}`;

    log(`Oturum Kimliği: \x1b[33m${sessionId}\x1b[0m`);
    log(`Tarayıcı Açılıyor: \x1b[34m${targetUrl}\x1b[0m`);
    log("Kullanıcının Studio'da belgelerini onaylayıp eğitimi başlatması bekleniyor...");

    openBrowser(targetUrl);

    // Poll until approved by the user in browser
    let approved = false;
    let attempts = 0;
    while (!approved && attempts < 180) {
      await new Promise((r) => setTimeout(r, 2000));
      attempts++;

      try {
        const verifyRes = await getJSON(`/api/session/verify/${sessionId}`);
        if (verifyRes?.session?.approved) {
          approved = true;
          const adapterFile = verifyRes.session.adapter_filename || "adapter_model.safetensors";
          console.log("\n");
          success("BAŞARILI: Model ağırlıkları eğitildi ve yerel agent'a bağlandı!");
          log(`Aktif LoRA Adaptörü: \x1b[36m${adapterFile}\x1b[0m`);
          log(`Yerel OpenAI Endpoint: \x1b[32m${SERVER_URL}/v1\x1b[0m`);
          
          await configureLocalAgentConfigs(adapterFile);

          console.log("\n\x1b[1mKullanım:\x1b[0m");
          console.log(`  Cursor / Windsurf Base URL: \x1b[33m${SERVER_URL}/v1\x1b[0m`);
          console.log(`  Model Adı: \x1b[33mlexicallayer-steered-model\x1b[0m`);
          console.log(`  Terminal Agent'ları İçin:   \x1b[33mexport OPENAI_BASE_URL=${SERVER_URL}/v1\x1b[0m\n`);
          process.exit(0);
        }
      } catch {}
      process.stdout.write(".");
    }

    if (!approved) {
      error("Oturum zaman aşımına uğradı.");
      process.exit(1);
    }
  } catch (err) {
    error(`İşlem hatası: ${err.message}`);
    process.exit(1);
  }
}

main();
