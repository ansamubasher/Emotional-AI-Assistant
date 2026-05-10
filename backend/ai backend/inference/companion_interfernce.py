import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.abspath(os.path.join(BASE_DIR, "blenderbot_model"))

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}.")

print(f"Loading model from: {MODEL_PATH}")
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
model.eval()

DEBUG = True

def generate_response(user_input):
    inputs = tokenizer(
        user_input,
        return_tensors="pt",
        truncation=True,
        max_length=128
    ).to(device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=100,
        )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()

    if DEBUG:
        print("\n========== DEBUG ==========")
        print("INPUT:", user_input)
        print("OUTPUT:", response)
        print("===========================\n")

    if not response:
        return "I'm really sorry you're feeling this way. You're not alone, I'm here for you."

    return response

if __name__ == "__main__":
    print(generate_response("I feel very stressed about exams"))