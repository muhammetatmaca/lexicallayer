"""
LexicalLayer - Authentic PEFT LoRA Training & Adaptation Engine
Trains real Rank-16 Low-Rank Adaptations on user's tokenized documents.
Saves actual adapter_model.safetensors directly for inference.
"""

import os
import torch
from typing import List, Dict, Any, Optional
from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, TaskType, PeftModel

DEFAULT_BASE_MODEL = "Qwen/Qwen2.5-0.5B-Instruct"

class UserDataset(torch.utils.data.Dataset):
    def __init__(self, tokenized_chunks: List[torch.Tensor]):
        self.chunks = tokenized_chunks

    def __len__(self):
        return len(self.chunks)

    def __getitem__(self, idx):
        item = self.chunks[idx]
        return {"input_ids": item, "labels": item.clone()}


class LexicalLoRATrainer:
    def __init__(self, base_model_name: str = DEFAULT_BASE_MODEL):
        self.base_model_name = base_model_name
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.dtype = torch.float16 if self.device == "cuda" else torch.float32

    def train_adapter(
        self,
        text_corpus: List[str],
        output_dir: str = "storage/lora_adapter",
        rank: int = 16,
        epochs: int = 3,
        batch_size: int = 2,
        lr: float = 3e-4,
        max_seq_len: int = 512
    ) -> Dict[str, Any]:
        """
        Runs real PyTorch/PEFT backpropagation training on the user's corpus.
        Produces real adapter_model.safetensors and adapter_config.json.
        """
        os.makedirs(output_dir, exist_ok=True)
        print(f"[LexicalLoRA] Base Model Yükleniyor: {self.base_model_name} (Device: {self.device})...")

        tokenizer = AutoTokenizer.from_pretrained(self.base_model_name)
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        # Chunk all text samples
        full_text = "\n\n".join(text_corpus)
        encodings = tokenizer(
            full_text,
            return_tensors="pt",
            truncation=False
        )["input_ids"][0]

        total_tokens = len(encodings)
        print(f"[LexicalLoRA] Toplam Gerçek Token Sayısı: {total_tokens:,}")

        # Slice into chunks of max_seq_len
        chunks = []
        for i in range(0, len(encodings), max_seq_len):
            chunk = encodings[i : i + max_seq_len]
            if len(chunk) >= 2:  # at least 2 tokens to compute cross entropy loss
                chunks.append(chunk)

        if not chunks:
            raise ValueError("Eğitim için yeterli metin bulunamadı.")

        print(f"[LexicalLoRA] Eğitim Parçaları (Batches): {len(chunks)} adet chunk oluşturuldu.")

        # Load Base Model
        model = AutoModelForCausalLM.from_pretrained(
            self.base_model_name,
            torch_dtype=self.dtype,
            low_cpu_mem_usage=True
        ).to(self.device)

        # Configure LoRA
        lora_config = LoraConfig(
            task_type=TaskType.CAUSAL_LM,
            r=rank,
            lora_alpha=rank * 2,
            target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
            lora_dropout=0.05,
            bias="none"
        )

        peft_model = get_peft_model(model, lora_config)
        peft_model.print_trainable_parameters()

        # Training loop using native PyTorch optimizer
        optimizer = torch.optim.AdamW(peft_model.parameters(), lr=lr)
        peft_model.train()

        total_loss = 0.0
        steps = 0

        # Run training passes
        for epoch in range(epochs):
            for i, chunk in enumerate(chunks):
                input_ids = chunk.unsqueeze(0).to(self.device)
                labels = input_ids.clone()

                optimizer.zero_grad()
                outputs = peft_model(input_ids=input_ids, labels=labels)
                loss = outputs.loss
                loss.backward()
                optimizer.step()

                total_loss += loss.item()
                steps += 1
                if steps % 5 == 0 or steps == len(chunks):
                    print(f"  [Epoch {epoch+1}/{epochs} | Step {steps}] Loss: {loss.item():.4f}")

        # Save actual trained LoRA adapter to disk
        print(f"[LexicalLoRA] LoRA Adaptörü Kaydediliyor: {output_dir}...")
        peft_model.save_pretrained(output_dir)
        tokenizer.save_pretrained(output_dir)

        # Check saved files
        saved_files = os.listdir(output_dir)
        print(f"[LexicalLoRA] Kaydedilen Dosyalar: {saved_files}")

        adapter_path = os.path.join(output_dir, "adapter_model.safetensors")
        file_size_mb = os.path.getsize(adapter_path) / (1024 * 1024) if os.path.exists(adapter_path) else 0

        return {
            "success": True,
            "total_tokens": total_tokens,
            "chunks_trained": len(chunks),
            "final_loss": round(total_loss / max(steps, 1), 4),
            "output_dir": output_dir,
            "adapter_size_mb": round(file_size_mb, 2),
            "device_used": self.device,
            "saved_files": saved_files
        }


def generate_with_trained_lora(
    prompt: str,
    base_model_name: str = DEFAULT_BASE_MODEL,
    adapter_dir: str = "storage/lora_adapter",
    max_new_tokens: int = 256
) -> str:
    """
    Loads base model + trained LoRA adapter and generates response directly from model weights.
    """
    device = "cuda" if torch.cuda.is_available() else "cpu"
    dtype = torch.float16 if device == "cuda" else torch.float32

    tokenizer = AutoTokenizer.from_pretrained(adapter_dir if os.path.exists(adapter_dir) else base_model_name)
    base_model = AutoModelForCausalLM.from_pretrained(
        base_model_name,
        torch_dtype=dtype,
        low_cpu_mem_usage=True
    ).to(device)

    if os.path.exists(adapter_dir):
        print(f"[Inference] LoRA adaptörü bağlanıyor: {adapter_dir}")
        model = PeftModel.from_pretrained(base_model, adapter_dir).to(device)
    else:
        model = base_model

    model.eval()

    messages = [{"role": "user", "content": prompt}]
    formatted_prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(formatted_prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )

    # Decode only the generated tokens
    new_tokens = outputs[0][inputs["input_ids"].shape[1]:]
    return tokenizer.decode(new_tokens, skip_special_tokens=True).strip()


if __name__ == "__main__":
    sample_text = [
        "Sistemler doğrudan çalışmalı. Fazla soyutlama ve dolaylı anlatım yerine sonuca odaklanıyoruz. "
        "Karmaşık mimariler basit ve yalın arayüzlerle yönetilmeli."
    ]
    trainer = LexicalLoRATrainer()
    stats = trainer.train_adapter(sample_text)
    print("Sonuç:", stats)
