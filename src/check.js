import { fromMarkdown } from 'mdast-util-from-markdown';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
const normalize = id => id.replace(/\s+/g, ' ').trim().toLowerCase();
const textOf = node => node.value ?? (node.children || []).map(textOf).join('');
export function inspect(markdown, { file = resolve('paper.md'), exists = existsSync } = {}) {
 const tree = fromMarkdown(markdown); const definitions = new Set(); const headings = []; const issues = []; let previous = 0;
 const add = (severity, code, line, message) => issues.push({ severity, code, line, message });
 function collect(node) { if (node.type === 'definition') definitions.add(normalize(node.identifier)); for (const child of node.children || []) collect(child); }
 collect(tree);
 function visit(node) {
  const line = node.position?.start.line || 1;
  if (node.type === 'code' || node.type === 'inlineCode') {
   if (node.type === 'code') { const raw = markdown.slice(node.position.start.offset, node.position.end.offset); const first = raw.split(/\r?\n/)[0]; const opening = /^ {0,3}(`{3,}|~{3,})/.exec(first); if (opening) { const fence = opening[1]; const ending = new RegExp(`^ {0,3}${fence[0]}{${fence.length},}\\s*$`); const rest = raw.split(/\r?\n/).slice(1); if (!rest.some(value => ending.test(value))) add('error', 'unclosed-fence', line, 'Fenced code block has no closing fence.'); } }
   return;
  }
  if (node.type === 'heading') { const title = textOf(node); headings.push({ depth: node.depth, title, line }); if (node.depth > previous + 1) add('warning', 'heading-jump', line, `Heading level jumps from ${previous} to ${node.depth}: ${title}`); previous = node.depth; }
  if (['link', 'image', 'definition'].includes(node.type)) {
   const url = node.url || '';
   if (url && !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url)) {
    try { const target = decodeURIComponent(url.split(/[?#]/)[0]); if (target && !exists(resolve(dirname(file), target))) add('error', 'missing-file', line, `Missing local file: ${target}`); }
    catch { add('error', 'invalid-path', line, `Invalid encoded path: ${url}`); }
   }
  }
  // Undefined explicit references are plain text in CommonMark's AST. Only inspect
  // text nodes: inline code, code fences, HTML and valid link nodes are excluded.
  if (node.type === 'text') {
   const re = /!?\[([^\]\n]+)\]\[([^\]\n]*)\]/g; let match;
   while ((match = re.exec(node.value))) {
    const id = normalize(match[2] || match[1]);
    if (!definitions.has(id)) { const lineOffset = node.value.slice(0, match.index).split('\n').length - 1; add('error', 'undefined-reference', line + lineOffset, `Undefined explicit reference: ${id}`); }
   }
  }
  // Link labels may contain bracket-like text but are already resolved.
  if (['link', 'image', 'definition', 'html'].includes(node.type)) return;
  for (const child of node.children || []) visit(child);
 }
 visit(tree); issues.sort((a, b) => a.line - b.line || a.code.localeCompare(b.code));
 return { file, headings, issues, errors: issues.filter(x => x.severity === 'error').length, warnings: issues.filter(x => x.severity === 'warning').length };
}
