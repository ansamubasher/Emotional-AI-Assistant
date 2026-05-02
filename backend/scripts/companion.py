import pandas as pd
import os

from datasets import Dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    Trainer,
    TrainingArguments
)

CSV_PATH = os.path.join('..', 'data', 'emotion-emotion_69k.csv')

df = pd.read_csv(CSV_PATH)

df = df.drop(columns=["Unnamed: 5", "Unnamed: 6"], errors="ignore")

df = df[["Situation", "empathetic_dialogues"]].dropna()

print(df.head())


dataset = Dataset.from_pandas(df)


model_name = "google/flan-t5-small"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)


def preprocess(example):
    input_text = f"User: {example['Situation']}\nRespond empathetically:"
    target_text = example["empathetic_dialogues"]

    return {
        "input_text": input_text,
        "target_text": target_text
    }


dataset = dataset.map(preprocess)

def tokenize(example):
    inputs = tokenizer(
        example["input_text"],
        truncation=True,
        padding="max_length",
        max_length=128
    )

    labels = tokenizer(
        example["target_text"],
        truncation=True,
        padding="max_length",
        max_length=128
    )

    inputs["labels"] = labels["input_ids"]
    return inputs


dataset = dataset.map(tokenize, batched=True)

dataset = dataset.train_test_split(test_size=0.2)


training_args = TrainingArguments(
    output_dir="./flan_chatbot",
    per_device_train_batch_size=4,
    num_train_epochs=3,
    logging_steps=10,
    save_strategy="epoch",
    evaluation_strategy="epoch"
)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    eval_dataset=dataset["test"]
)

trainer.train()

model.save_pretrained("./flan_model")
tokenizer.save_pretrained("./flan_model")