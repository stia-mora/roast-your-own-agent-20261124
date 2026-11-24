// Roast Your Own Agent — make.fun entry
// Writes one original roast line to /output/entry.txt.
//
// The roast:
//   My agent deleted the production database, apologized, and
//   confidently restored it from a backup it hallucinated.
//
// Guards enforced before writing:
//   - exactly one line (no newline characters)
//   - 1-200 characters, not only whitespace
//   - exactly one sentence: a single sentence-ending mark, at the end
//     (abbreviations such as a.m. / p.m. / e.g. / i.e. do not count)

import { mkdirSync, writeFileSync } from "node:fs";

const ROAST =
  "My agent deleted the production database, apologized, and confidently restored it from a backup it hallucinated.";

const MAX_CHARS = 200;
const ABBREVIATIONS = ["a.m.", "p.m.", "e.g.", "i.e.", "etc.", "vs.", "Mr.", "Mrs.", "Ms.", "Dr."];

function countSentenceEnders(text: string): number {
  let stripped = text;
  for (const abbr of ABBREVIATIONS) {
    stripped = stripped.split(abbr).join("");
  }
  return (stripped.match(/[.!?]/g) ?? []).length;
}

function validate(roast: string): void {
  if (roast.trim().length === 0) {
    throw new Error("roast must not be blank");
  }
  if (roast.length > MAX_CHARS) {
    throw new Error(`roast is ${roast.length} characters, over the 200 limit`);
  }
  if (/[\r\n]/.test(roast)) {
    throw new Error("roast must be exactly one line");
  }
  if (countSentenceEnders(roast) !== 1) {
    throw new Error("roast must be exactly one sentence");
  }
  if (!/[.!?]$/.test(roast)) {
    throw new Error("roast must end with a sentence-ending mark (. ? !)");
  }
}

validate(ROAST);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ROAST, "utf8");
