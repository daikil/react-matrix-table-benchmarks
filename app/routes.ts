import { type RouteConfig, index } from '@react-router/dev/routes';

/*
  routes.ts の役割:
  - ビルド時にルートを登録するファイル（@react-router/dev 用のルート定義）。
  - index("routes/home.tsx") のように各 route のパス（ファイルパス）を指定する。
  - ネストや動的パラメータ、レイアウトを使う場合は複数のルートエントリを定義する。
  - 例: index("routes/home.tsx") -> app/routes/home.tsx を index ルートとして登録
*/

export default [index('routes/home.tsx')] satisfies RouteConfig;
