import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Copy entry.txt (a single one-line office joke, 1-200 chars, no trailing
// newline) to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Reads only entry.txt next to this script; writes nothing into the repo.
const scriptDir = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(scriptDir, "entry.txt"), "utf8");

if (entry.length < 1 || entry.length > 200 || entry.trim().length === 0) {
  console.error(
    `error: entry.txt must be 1-200 characters and not only whitespace, got ${entry.length} characters`,
  );
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
