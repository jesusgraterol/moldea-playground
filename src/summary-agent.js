import OpenAI from "openai";
import { loadInstruction } from "./instructions.js";

export async function summarizeNote(note) {
  const instructions = await loadInstruction();
  const client = new OpenAI();
  const response = await client.responses.create({
    model: "gpt-6-astra",
    instructions,
    input: note,
    store: false,
  });

  return response.output_text;
}
