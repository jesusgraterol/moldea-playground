import OpenAI from "openai";

const instructions = [
  "Summarize the supplied note in exactly one concise sentence.",
  "Return plain text without bullets or Markdown headings.",
  "Preserve the note's main outcome and next step without adding facts.",
].join(" ");

export async function summarizeNote(note) {
  const client = new OpenAI();
  const response = await client.responses.create({
    model: "gpt-6-astra",
    instructions,
    input: note,
    store: false,
  });

  return response.output_text;
}
