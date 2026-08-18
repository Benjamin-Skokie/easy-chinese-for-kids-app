import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const posixRoots = ["Users", "home", "private", "var", "tmp", "Volumes", "opt", "Applications", "Library", "System", "usr", "bin", "sbin", "dev", "mnt", "media", "root"].join("|");
const forbiddenPathPatterns = [
  new RegExp(`(?:^|[\\s'\"\`(=])/(?:${posixRoots})(?:/|$)`, "g"),
  /(?:^|[\s'"`(=])[A-Za-z]:[\\/]/g,
  /(?:^|[\s'"`(=])\\\\[A-Za-z0-9.-]+[\\/][A-Za-z0-9._ -]+/g
];
function violationsIn(text, label) {
  const violations = [];
  for (const [index, line] of text.split(/\r?\n/).entries()) {
    for (const pattern of forbiddenPathPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        violations.push(`${label}:${index + 1}: ${line.trim()}`);
        break;
      }
    }
  }
  return violations;
}

function trackedFiles() {
  return execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
    .split("\0")
    .filter(Boolean);
}

function isTextFile(file) {
  try {
    return !readFileSync(file).includes(0);
  } catch {
    return false;
  }
}

function scanRepository() {
  return trackedFiles().flatMap((file) => {
    if (!isTextFile(file)) return [];
    return violationsIn(readFileSync(file, "utf8"), file);
  });
}

function scanStagedDiff() {
  const diff = execFileSync("git", ["diff", "--cached", "--no-ext-diff", "--unified=0"], { encoding: "utf8" });
  return diff
    .split(/\r?\n/)
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"))
    .flatMap((line, index) => violationsIn(line.slice(1), `staged diff:${index + 1}`));
}

function scanCommitRange(range) {
  const messages = execFileSync("git", ["log", "--format=%B", range], { encoding: "utf8" });
  return violationsIn(messages, "commit message");
}

const [mode, value] = process.argv.slice(2);
const violations = mode === "--staged"
  ? scanStagedDiff()
  : mode === "--message-file" && value
    ? violationsIn(readFileSync(resolve(value), "utf8"), "commit message")
    : mode === "--commit-range" && value
      ? scanCommitRange(value)
    : scanRepository();

if (violations.length) {
  console.error("Absolute filesystem paths are not allowed. Use repository-relative paths instead:");
  console.error(violations.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Relative path check passed.");
}
