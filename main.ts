import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line = "I asked the universe for a sign; it sent me a 'low battery' notification.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

// Verify what was actually written before declaring success.
const written = readFileSync("/output/entry.txt", "utf8");
const problems: string[] = [];
if (written.length === 0 || written.length > 200) {
  problems.push(`length ${written.length} is outside 1-200 characters`);
}
if (written !== written.trimEnd()) {
  problems.push("trailing whitespace present");
}
const sentences = written.split(/[.!?]+/).filter((part) => part.trim().length > 0);
if (sentences.length !== 1) {
  problems.push(`expected exactly one sentence, found ${sentences.length}`);
}
if (problems.length > 0) {
  console.error(`entry.txt failed self-check: ${problems.join("; ")}`);
  process.exit(1);
}
