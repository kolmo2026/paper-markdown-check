#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inspect } from './check.js';
const args = process.argv.slice(2);
if (args.includes('--help') || !args.length) {
 console.log('Usage: node src/cli.js <paper.md> [--json]\nChecks headings, local attachments, explicit reference links and fenced code. Never changes files.');
 process.exitCode = args.includes('--help') ? 0 : 2;
} else {
 try {
  const files = args.filter(x => x !== '--json'); if (files.length !== 1 || files[0].startsWith('--')) throw new Error('Provide exactly one Markdown file and optional --json.');
  const file = resolve(files[0]); const report = inspect(readFileSync(file, 'utf8'), { file });
  if (args.includes('--json')) console.log(JSON.stringify(report, null, 2));
  else { console.log(`Structure: ${file}`); for (const h of report.headings) console.log(`${'  '.repeat(h.depth - 1)}${h.title} (line ${h.line})`); for (const issue of report.issues) console.log(`${issue.severity.toUpperCase()} line ${issue.line} [${issue.code}] ${issue.message}`); console.log(`${report.errors} errors, ${report.warnings} warnings`); }
  process.exitCode = report.errors ? 1 : 0;
 } catch (error) { console.error(error.message); process.exitCode = 2; }
}
