import json
import collections

with open("storage/user_state.json", "r", encoding="utf-8") as f:
    data = json.load(f)

docs = data.get("user_dataset", [])
print(f"Toplam Belge: {len(docs)}")
if docs:
    for i, d in enumerate(docs):
        print(f"Belge {i+1}: {d.get('name')} | Token: {d.get('token_count')}")
        text = d.get("text", "")
        clean_words = [w.strip(".,!?;:\"'()[]{}<>-") for w in text.split() if len(w) > 3]
        common = collections.Counter(clean_words).most_common(20)
        print("Öne çıkan kelimeler/tokenlar:")
        for w, c in common:
            print(f"  - {w}: {c} kez")
