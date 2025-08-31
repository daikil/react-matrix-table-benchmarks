import { MatrixTable } from '~/Table/MatrixTable';
import type { Route } from './+types/home';

/*
  ルートファイルのポイント:
  - default export: ページコンポーネント
  - export const loader: データ取得（SSR/SSG） -> useLoaderData() で取得
  - export const action: フォーム送信等の POST ハンドラ
  - export const meta / links: ページ固有の meta / head リソース
*/

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <main className="p-4 container mx-auto">
      <MatrixTable />
    </main>
  );
}
