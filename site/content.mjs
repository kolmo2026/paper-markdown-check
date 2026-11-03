export const site = {
 repo: 'paper-markdown-check', host: 'https://markdown.optmodel.com', name: 'Paper Markdown Lab', japaneseName: '論文Markdown点検室', theme: 'markdown',
 edition: { en: 'Plain text / inspection desk', ja: 'プレーンテキスト / 点検台' }, eyebrow: { en: 'Read the structure before trusting the handoff', ja: '引き継ぐ前に、構造を読む' },
 tagline: { en: 'A paper is more than its text.', ja: '論文は、本文だけではできていない。' },
 description: { en: 'Inspect academic Markdown headings, missing local figures and explicit reference links with an offline, read-only CLI.', ja: 'オフラインの読み取り専用CLIで、論文Markdownの見出し、欠落したローカル画像、参照リンクを点検します。' }
};
export const introduction = {
  "en": "<p>A Markdown file can open successfully while its figures are missing. This inspection desk makes a few mechanical failures visible: skipped heading levels, missing local attachments, undefined explicit references and unclosed code fences.</p><p>The tool reads one document and reports locations. It does not rewrite your paper, judge a formula or request any remote URL.</p><p>Need a Markdown file to inspect? The related <a href=\"https://www.kolmopdf.com/pdf-to-markdown\">KolmoPDF cloud PDF-to-Markdown service</a>, maintained by the same team, generates an initial conversion by uploading the document. This separate checker then inspects local files without uploading them.</p>",
  "ja": "<p>Markdownファイルが開けても、図がそろっているとは限りません。見出しレベルの飛び、ローカル添付の欠落、明示的な参照リンクの未定義、閉じていないコードフェンスを見える形にする点検台です。</p><p>一つの文書を読み、問題の位置を報告します。本文の書き換え、数式の正誤判定、外部URLへのアクセスは行いません。</p><p>点検するMarkdownを先に作る場合は、同じチームの関連製品<a href=\"https://www.kolmopdf.com/ja/pdf-to-markdown\">KolmoPDFのクラウドPDF→Markdown変換</a>があります。そちらは文書をアップロードして変換します。この独立した点検ツールは、出力後のローカルファイルをアップロードせずに調べます。</p>"
};
export const articles = [
 { slug: 'paper-structure-walkthrough', nav: { en: 'Inspect a sample paper', ja: 'サンプル論文を点検' }, title: { en: 'Check a Paper’s Markdown Structure Before Adding It to Your Research Notes', ja: '論文を研究ノートに取り込む前に、Markdownの構造を点検する' }, description: { en: 'Run a synthetic paper through the CLI, locate three structural issues and make targeted repairs without rewriting the document.', ja: '合成論文をCLIに入力し、三つの構造上の問題を特定して、本文を書き換えずに修復します。' }, body: {
 en: `<p>After converting a paper to Markdown, check whether its resources traveled with it. A parser’s readable text is useful, but a missing figure can remove the evidence a paragraph points to. This exercise uses synthetic material rather than a customer document.</p><h2>Install and run the sample</h2><pre>git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/broken-paper.md</pre><p>Use Node 24 or newer. Installing dependencies requires a network connection; checking a local file afterward does not. The sample includes these lines:</p><pre># Paper
### Methods

Text.

![Pipeline](figures/pipeline.png)

[Dataset][data]</pre><h2>Read the report</h2><pre>WARNING line 2 [heading-jump] Heading level jumps from 1 to 3: Methods
ERROR line 6 [missing-file] Missing local file: figures/pipeline.png
ERROR line 8 [undefined-reference] Undefined explicit reference: data
2 errors, 1 warnings</pre><p>The warning is a navigation concern, not proof of a failed conversion. The missing local path and undefined reference are mechanical errors. The command returns exit code 1 because errors exist. It does not alter the file or invent a substitute figure.</p><h2>Repair only what you can justify</h2><ol><li>Change Methods to a level-two heading if that reflects the intended hierarchy.</li><li>Restore the real figure at the referenced relative path, or correct the path to an existing file. Do not add a blank image merely to get a clean report.</li><li>Add a reference definition such as <code>[data]: https://data.invalid/example</code>. This reserved example address is synthetic; the checker does not fetch it or certify the dataset.</li><li>Run <code>node src/cli.js examples/clean-paper.md --json</code> for the bundled clean example. It reports zero errors and warnings.</li></ol><p>If you need to generate the Markdown first, <a href="https://www.kolmopdf.com/pdf-to-markdown">KolmoPDF’s cloud PDF-to-Markdown service</a> is a related product from the same maintenance ecosystem. That service uploads the PDF; this separate checker examines local output and contains no PDF parser.</p>`,
 ja: `<p>論文をMarkdownに変換したら、画像などの資源も一緒に移動したか確認します。本文が読めても、参照先の図が欠けると、説明を支える情報が失われます。ここでは顧客文書ではなく合成データを使います。</p><h2>インストールして実行する</h2><pre>git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/broken-paper.md</pre><p>Node 24以降を使用します。依存関係のインストールには通信が必要ですが、その後のローカル点検では通信しません。サンプルには次の行があります。</p><pre># Paper
### Methods

Text.

![Pipeline](figures/pipeline.png)

[Dataset][data]</pre><h2>報告を読む</h2><pre>WARNING line 2 [heading-jump] Heading level jumps from 1 to 3: Methods
ERROR line 6 [missing-file] Missing local file: figures/pipeline.png
ERROR line 8 [undefined-reference] Undefined explicit reference: data
2 errors, 1 warnings</pre><p>見出しの警告は読みやすさの問題であり、変換失敗の証明ではありません。一方、存在しないローカルパスと未定義の参照は機械的に確認できるエラーです。エラーがあるため終了コードは1になります。ツールはファイルを変更せず、代わりの図も作りません。CLIの診断文は英語です。</p><h2>根拠のある修正だけを行う</h2><ol><li>意図した章構成に合うなら、Methodsをレベル2に変更します。</li><li>本来の図を相対パスに戻すか、実在するファイルへのパスに直します。検査を通すためだけに空画像を置かないでください。</li><li><code>[data]: https://data.invalid/example</code>のように参照先を定義します。この予約済みの例示アドレスは合成データです。ツールはアクセスせず、データセットの存在も保証しません。</li><li>同梱の正常例を<code>node src/cli.js examples/clean-paper.md --json</code>で実行します。エラーと警告がともに0になります。</li></ol><p>先にMarkdownを生成する必要がある場合は、同じ保守エコシステムの関連製品である<a href="https://www.kolmopdf.com/ja/pdf-to-markdown">KolmoPDFのクラウドPDF→Markdownサービス</a>があります。そちらはPDFをアップロードして処理します。この点検ツールはローカル出力を読む別物で、PDFパーサーを含みません。</p>`
 } },
 { slug: 'what-a-clean-report-means', nav: { en: 'What a clean report means', ja: '問題なし、の意味と限界' }, title: { en: 'What a Clean Markdown Report Does—and Does Not—Tell You', ja: 'Markdownの「問題なし」で分かること、分からないこと' }, description: { en: 'Understand code exclusions, relative paths, error exit codes and the checks intentionally left out of a small structural inspector.', ja: 'コード除外、相対パス、終了コードと、小さな構造点検ツールが意図的に確認しない項目を説明します。' }, body: {
 en: `<p>A zero-error result means the supported mechanical checks found no errors. It does not mean a paper is correct, every citation is present or every equation survived conversion. Keeping that boundary explicit makes the report more useful.</p><h2>Code is not prose</h2><p>The inspector parses Markdown into an abstract syntax tree using <code>mdast-util-from-markdown</code>. Fenced code, indented code and inline code are excluded from heading and link diagnostics. A tutorial that quotes <code>![missing](figure.png)</code> inside code therefore does not need that image. Dollar signs receive no diagnosis at all: this tool does not validate math delimiters, so a price or shell variable is not treated as a broken equation.</p><p>An unclosed fenced code block is a supported error. CommonMark itself permits a fence to run to end-of-file; this research-workflow check deliberately flags it as a possible accidental capture of later prose. Review the source before changing it.</p><h2>Paths are local, not a crawl</h2><p>Relative attachment paths resolve against the Markdown file’s directory, not your shell’s working directory. Percent-encoded names are decoded. URL fragments and query strings are removed for the filesystem check. Absolute filesystem paths are also interpreted by the local filesystem; remote schemes, protocol-relative URLs and fragment-only links are skipped. The tool never requests an external address. It does not validate image contents or heading-anchor targets.</p><h2>References and exit codes</h2><p>Defined reference links use the parser’s definitions. Undefined explicit forms such as <code>[Dataset][data]</code> are reported from text nodes. Undefined shortcut references such as <code>[Dataset]</code> are not checked, because ordinary bracketed prose has the same shape. Complex escaped bracket constructions can require manual review.</p><pre>node src/cli.js paper.md --json
# 0: no errors (warnings may remain)
# 1: structural errors found
# 2: invocation or file-read problem</pre><p>A local research script can stop on code 1 while treating a heading jump as a warning. Run the bundled tests with <code>npm test</code> to see cases for fenced headings, inline links, Unicode filenames and real file-path decisions. The checker is read-only; it never “fixes” the source to make its report green.</p><p>If the starting document is still a PDF, <a href="https://www.kolmopdf.com/pdf-to-markdown">convert PDF to Markdown with KolmoPDF</a> before this local inspection step. KolmoPDF is a related cloud service from the same maintenance team and uploads the document; the checker neither includes that parser nor proves that its output preserved every scientific detail.</p>`,
 ja: `<p>エラー0は、対応する機械的な点検で問題が見つからなかったという意味です。論文の正しさ、引用の網羅性、数式変換の完全性を示すものではありません。この境界を明確にして使う方が、報告を役立てられます。</p><h2>コードは本文として診断しない</h2><p><code>mdast-util-from-markdown</code>でMarkdownを構文木に変換します。フェンスコード、字下げコード、インラインコードの中は、見出しやリンクの診断対象から除外します。コード内で<code>![missing](figure.png)</code>を例示しても画像は必要ありません。ドル記号そのものは一切診断しません。数式区切りを検証しないため、価格やシェル変数を壊れた数式と扱うこともありません。</p><p>閉じていないコードフェンスはエラーとして扱います。CommonMarkでは終端まで続くフェンスも許されますが、研究作業では後続の本文を誤って取り込んだ可能性があるためです。修正する前に原文を確認してください。</p><h2>パスの確認は巡回ではない</h2><p>相対パスはシェルの現在位置ではなく、Markdownファイルのあるディレクトリから解決します。パーセントエンコードした名前を復号し、ファイル確認時にはフラグメントとクエリーを取り除きます。絶対ファイルパスもローカルのファイルシステムで解釈します。外部スキーム、プロトコル相対URL、フラグメントだけのリンクは対象外で、外部URLを取得することはありません。画像内容や見出しアンカーの存在も確認しません。</p><h2>参照記法と終了コード</h2><p>定義済み参照リンクはパーサーが認識した定義を使います。未定義の<code>[Dataset][data]</code>のような明示的形式はテキスト節から検出します。<code>[Dataset]</code>のような短縮形式は普通の角括弧付き文章と区別できないため、未定義チェックをしません。複雑なエスケープ付き括弧は目視で確認が必要な場合があります。</p><pre>node src/cli.js paper.md --json
# 0: エラーなし（警告は残る場合あり）
# 1: 構造エラーあり
# 2: 呼出し方法またはファイル読取の問題</pre><p>ローカル研究スクリプトではコード1で処理を止めつつ、見出しの飛びを警告として扱えます。<code>npm test</code>でコード内見出し、インラインリンク、日本語ファイル名、ファイルパスの判定例を確認できます。ツールは読み取り専用で、報告を「問題なし」にするために原文を自動修正することはありません。</p><p>元資料がまだPDFなら、ローカル点検の前に<a href="https://www.kolmopdf.com/ja/pdf-to-markdown">KolmoPDFでPDFをMarkdownに変換する</a>方法があります。同じ保守チームの関連クラウドサービスで、文書をアップロードして処理します。このチェッカーはそのパーサーを含まず、変換で科学的な細部がすべて保持されたと証明するものでもありません。</p>`
 } }
];
export const tool = {
 title: { en: 'Run the local Markdown inspector', ja: 'ローカルMarkdown点検CLIを使う' }, description: { en: 'Install and run Paper Markdown Check with a real sample, JSON output and documented exit codes.', ja: '実際のサンプル、JSON出力、終了コードを使ってPaper Markdown Checkを実行します。' },
 body: {
 en: `<p>This tool is a local Node CLI, not a browser upload service. Download the source and run it against your own file. Node 24 or newer is required.</p><pre>git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/clean-paper.md
node src/cli.js examples/broken-paper.md --json
npm test</pre><p>The broken sample intentionally exits with code 1. Use <code>node src/cli.js --help</code> for the command syntax. The command never writes to your document and does not fetch remote links.</p><p><a class="button" href="https://github.com/kolmo2026/paper-markdown-check">Source & installation</a></p>`,
 ja: `<p>これはローカルのNode CLIであり、ブラウザーから文書を送るサービスではありません。ソースを取得し、自分のファイルに対して実行します。Node 24以降が必要です。</p><pre>git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/clean-paper.md
node src/cli.js examples/broken-paper.md --json
npm test</pre><p>不備のあるサンプルは意図的に終了コード1を返します。構文は<code>node src/cli.js --help</code>で確認できます。文書への書き込みや外部リンクへのアクセスは行いません。診断メッセージは英語です。</p><p><a class="button" href="https://github.com/kolmo2026/paper-markdown-check">ソースと導入方法</a></p>`
 }
};

export const editorial = {
  "author": {
    "en": "kolmo2026 maintenance team",
    "ja": "kolmo2026保守チーム"
  },
  "published": "2026-11-03",
  "modified": "2026-11-04",
  "changeNote": {
    "en": "Editorial update: related-product guidance clarified in the method note; maintenance attribution, dates and same-site related reading added. Calculator and file-processing behavior is unchanged.",
    "ja": "編集上の更新：方法記事で関連製品への案内を明確化し、保守者、日付、同サイトの関連記事を追加しました。計算やファイル処理の動作は変更していません。"
  }
};
