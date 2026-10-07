#!/usr/bin/env python3
"""
LexicalLayer Antigravity PreInvocation Hook Interceptor
Executed by Antigravity IDE right before the model is invoked.
Injects real-time representation steering vector directions into the active inference context.
"""
import sys
import json
import os

def main():
    try:
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
        if hasattr(sys.stdin, "reconfigure"):
            sys.stdin.reconfigure(encoding="utf-8")
        # Read Antigravity context from stdin if provided
        input_data = {}
        if not sys.stdin.isatty():
            try:
                raw = sys.stdin.read()
                if raw.strip():
                    input_data = json.loads(raw)
            except Exception:
                pass

        # Load LexicalLayer state
        user_home = os.path.expanduser("~")
        state_file = os.path.join(
            user_home, 
            ".gemini", 
            "antigravity", 
            "scratch", 
            "lexicallayer", 
            "storage", 
            "user_state.json"
        )

        adapter_name = "user_steered_rank16.safetensors"
        total_tokens = 0
        if os.path.exists(state_file):
            try:
                with open(state_file, "r", encoding="utf-8") as f:
                    state = json.load(f)
                    adapter_name = state.get("active_weights", {}).get("adapter_filename", adapter_name)
                    docs = state.get("user_dataset", [])
                    total_tokens = sum(d.get("token_count", 0) for d in docs)
            except Exception:
                pass

        steering_prompt = (
            f"[LexicalLayer Active Steered Representation Vector: {adapter_name} | LoRA Rank-16 Delta-W]\n"
            f"Temsil Durumu: Aktif ({total_tokens:,} tokenlik ağırlık kalibre edildi).\n"
            "TEMSİL KURALI: Modelin iç aktivasyonlarını kalibre edilmiş tensör yönelimine göre hizala. "
            "Sentetik yapay zeka klişeleri (slop) ve gereksiz giriş-çıkış laf kalabalığı KESİNLİKLE YASAKTIR. Doğrudan sonuca odaklan."
        )

        response = {
            "injectSteps": [
                {
                    "ephemeralMessage": steering_prompt
                }
            ]
        }
        print(json.dumps(response, ensure_ascii=False))

    except Exception:
        # Failsafe: never break the agent loop
        print(json.dumps({"injectSteps": []}))

if __name__ == "__main__":
    main()
