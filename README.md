# BookMark-App(現在開発中)

## 開発動機

- PC で保存したブックマークをスマホで使いたかった

- ブックマークしたサイトにメモ(なぜ保存したのか、どこが特に重要なのかなど)をつけたかった

- 普段使っているブックマークが多くなり見にくくなってしまったので、もう少し見やすいブックマークを作りたかった

## 機能

- bookMark の登録/閲覧/編集/削除

- bookmark のメモ機能(Markdown 対応)/日付の取得

- フォルダー登録/閲覧/編集/削除

- 検索機能

- ログイン/ログアウト

- favicon の取得(GoogleAPI 使用)

- アカウント登録/削除(可能であれば)

- 名前順/日付順の表示(可能であれば)

- OGP 機能(可能であれば)

## 使用言語・フレームワーク・ライブラリなど

- TypeScript

- React

- Redux toolkit

- Nextjs

- Material ui

- Firebase(Authentication, Cloud Firestore)

- vercel(hosting)

## ディレクトリー構成

- ### **`/config`**<br/>

  firebase の設定ファイルが含まれる<br/>

- ### **`/src`**<br/>

  bookMarkApp<br/>

  - **`/components`**<br/>

  各ページのコンポーネントが含まれる<br/>

  - **`/pages`**<br/>

  各ページが含まれる<br/>

  - **`/slice`**<br/>

  各ページの slice ( redux-toolkit 用の関数、action,action-creater,reducer ) が含まれる<br/>

  - **`/types`**<br/>

  各コンポーネントで使われる state の type が含まれる<br/>

  - **`/store.ts`**<br/>

  store や middleware の設定、rootReducer はこのファイルに含まれる

  - **`/theme.ts`**<br/>

  material ui のテーマ（色）設定が含まれる
