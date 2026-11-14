import { parseArgs } from "node:util";
import { summarizeNote } from "./summary-agent.js";

const { positionals } = parseArgs({ allowPositionals: true });
const note = positionals.join(" ").trim();

if (!note) {
  console.error('Usage: npm start -- "Release note"');
  process.exitCode = 1;
} else {
  console.log(await summarizeNote(note));
}
