# Paper Markdown Check

[English](README.md) · [日本語サイト](https://markdown.optmodel.com/ja/)

学術Markdown向け読み取り専用オフラインNode CLIです。章構造、見出しの飛び、ローカル資源欠落、明示的な未定義参照リンク、閉じていないコードフェンスを報告します。

## 導入と実行

Node 24以降とnpmが必要です。依存関係の取得時には通信します。

```sh
git clone https://github.com/kolmo2026/paper-markdown-check.git
cd paper-markdown-check
npm ci
node src/cli.js examples/clean-paper.md
node src/cli.js examples/broken-paper.md --json
```

不備のあるサンプルは意図的に終了コード1を返します。構文は`node src/cli.js --help`で確認できます。サイトのプレビューは`npm run build`の後、`npm run serve -- --port 4173`で起動します。

## 再現できる例

**入力：** broken-paper.md：見出し1から3へ飛び、6行目のfigures/pipeline.pngが欠落し、8行目の[Dataset][data]に定義がありません。

**出力：** 2行目に見出し警告1件、6・8行目にエラー2件、終了コード1。clean-paper.mdはエラー0、警告0、終了コード0です。

サンプル：examples/clean-paper.md and examples/broken-paper.md。同梱文書と数値はすべて合成例です。

## テストとビルド

```sh
npm test
npm run build
```

サイトの編集元は`site/`、生成手順は`scripts/`です。ツール実装は`src/`、核となるテストは`test/`にあります（blogには計算エンジンはありません）。独立した静的サイトを`docs/`に生成し、英日対応ページ、canonical/hreflang、sitemap、robots、CNAME、.nojekyllを含めます。公開用ホストはhttps://markdown.optmodel.comです。隣のリポジトリに依存せず単独でビルドできます。


## 制約

PDF解析、数式の正誤、事実確認、外部URL取得は行いません。コードブロックとインラインコードを除外し、ドル記号を診断しません。短縮参照の未定義や複雑な括弧エスケープは対象外です。相対パスは入力Markdownの場所を基準にします。自動修正はありません。終了コード0はエラーなし（警告可）、1は構造エラー、2は呼出し・読取失敗です。診断文は英語です。

## プライバシーとツール

アカウント、アクセス解析、バックエンド、文書のアップロード先はありません。計算とファイル処理はローカルです。ただし公開サイト資源の取得には通信します。ブラウザー依存ライブラリーは同梱し、実行時CDNは使いません。JSONは平文なので、共有前にファイル名や条件を確認してください。

[KolmoPDF PDF→Markdown](https://www.kolmopdf.com/ja/pdf-to-markdown)：文書をアップロードする別のクラウド変換サービスです。この点検CLIはPDFパーサーを含みません。


## ライセンス

MIT。[LICENSE](LICENSE)を参照してください。依存ライブラリーにはそれぞれのライセンスが適用されます。依存導入後のビルドでは、その本文をTHIRD-PARTY-NOTICES.txtに集めます。
