# Paper Markdown Check

[日本語](README.ja.md) · [Educational site](https://markdown.optmodel.com/)

A read-only offline Node CLI for academic Markdown: chapter tree, heading jumps, missing local files, undefined explicit reference links and unclosed fenced code.

## Install and run

Requires Node 24+ and npm. Dependency installation needs a network connection.

```sh
git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/clean-paper.md
node src/cli.js examples/broken-paper.md --json
```

The broken sample intentionally exits 1. `node src/cli.js --help` shows usage. To preview the educational site: `npm run build`, then `npm run serve -- --port 4173`.

## Reproducible example

**Input:** broken-paper.md: heading level 1 then 3; missing figures/pipeline.png at line 6; [Dataset][data] without a definition at line 8.

**Output:** 1 heading warning (line 2), 2 errors (lines 6 and 8), exit code 1. clean-paper.md returns 0 errors, 0 warnings and exit code 0.

Fixtures: examples/clean-paper.md and examples/broken-paper.md. All supplied documents and numbers are synthetic.

## Tests and build sources

```sh
npm test
npm run build
```

Exact line reports, fenced/inline code exclusions, unclosed fences, Unicode local paths, references and unchanged input text.

Source: `src/`, `test/`, `site/` and `scripts/`. The static site is built to `docs/`, with English/Japanese equivalents, canonical/hreflang links, sitemap, robots, CNAME and .nojekyll. Its hostname is https://markdown.optmodel.com. Each repository is self-contained; no sibling directory is needed to build.


## Limits

Does not parse PDFs, validate mathematical content, judge factual correctness or fetch remote URLs. Code blocks and inline code are excluded; dollar signs are not diagnosed. Undefined shortcut references and complex escaped bracket prose are outside the explicit-reference check. Relative paths resolve beside the input Markdown. No automatic rewrites. Exit codes: 0 no errors (warnings allowed), 1 structural errors, 2 invocation/read failure. CLI diagnostics are English.

## Privacy and tools

No account, analytics, backend or document-upload endpoint. Calculations/file operations run locally. Public site assets still load over the network; browser dependencies are bundled rather than fetched from a runtime CDN. JSON exports are plain text; review filenames and assumptions before sharing.

[KolmoPDF PDF to Markdown](https://www.kolmopdf.com/pdf-to-markdown) — a separate cloud conversion service that uploads documents. This checker has no PDF parser.


## License

MIT; see [LICENSE](LICENSE). Third-party dependencies retain their own licenses; when dependencies are installed, the build collects their license texts in THIRD-PARTY-NOTICES.txt.
