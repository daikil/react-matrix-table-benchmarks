import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';

/*
  root.tsx の役割（簡潔）:
  - links(): head に挿入する<link>を定義（フォントや外部 CSS）。
  - Layout: HTML の基本テンプレート。Meta/Links はここで使う。
  - App: ルートの表示ポイント。通常は <Outlet /> を返す（ネストされたルートをここに描画）。
  - ErrorBoundary: ルート単位のエラーハンドリング表示。開発時にスタックトレースを出すと便利。
*/

export const links: Route.LinksFunction = () => [
  // ここに追加で preload / stylesheet を返すことで head に挿入される
];

export function Layout({ children }: { children: React.ReactNode }) {
  // Layout はサーバー側レンダリング時の <html> テンプレート。
  // ネストされた layout が必要なら、このコンポーネントを routes で使う。
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <Meta /> は各ルートの meta() を集めて挿入する */}
        <Meta />
        {/* links() の中身がここに挿入される */}
        <Links />
      </head>
      <body>
        <React.StrictMode>
          <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
            {children}
            {/* SPA のスクロール復元 */}
            <ScrollRestoration />
            {/* ビルド時に差し込まれるスクリプト（クライアントバンドル等） */}
            <Scripts />
          </StyledEngineProvider>
        </React.StrictMode>
      </body>
    </html>
  );
}

export default function App() {
  // ルートの表示ポイント。ネストされたルートをここにレンダリングする。
  // レイアウトを使いたい場合は routes 側で Layout をルート要素として指定することもある。
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  // isRouteErrorResponse を使うと HTTP ステータスに応じたエラー表示ができる
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    // 開発時のみ詳細とスタックを表示
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
