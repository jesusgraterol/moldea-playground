import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function loadInstruction() {
  const instructionPath = join(
    import.meta.dirname,
    "..",
    "moldea",
    "agents",
    "note-summarizer",
    "instruction.md",
  );

  return readFile(instructionPath, "utf8");
}
