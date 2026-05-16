from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

MODEL_PATH = "./flan_model"

tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_PATH)


def generate_response(user_input):
    input_text = f"User: {user_input}\nRespond empathetically:"

    inputs = tokenizer(input_text, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_length=100
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)