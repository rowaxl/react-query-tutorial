# React Query チュートリアル

## Required
- json-server（など）
  - default port: 4000

## Installation
1. プロジェクトルートで`yarn install` コマンドを実行
2. `yarn start` でサンプルを実行
3. 別ターミナルで、空の`db.json` を作成し、`json-server -p 4000 db.json`コマンドでローカルjson-serverを作成する

## Overview
挙動において`react-query`の特筆すべきポイントは以下となります
- Fetchボタンを押す前にはGETしないこと(enableは`Todo`コンポーネントのstateで制御)
- Fetchボタン押下時、`Todo`コンポーネントと `TodoCount`コンポーネントでそれぞれqueryを呼び出すが、サーバーへの通信は一度だけ起こること
- 2割の確率でfetch時にエラーが発生すると、エラーメッセージが表示され、refecthボタンを押下すると再度fetchを呼びされること
- queryが更新された時(All, Undone, Done)、都度fetchが行われること
- refetch押下時、queryを維持したまま即時にfetchが行われること
- create / update時にエラーが発生した場合、ロールバック処理が行われること
