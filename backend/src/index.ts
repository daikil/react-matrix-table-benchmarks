import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors'; // 追加

const app = new Hono();

// 全てのエンドポイントに対して CORS を適用（必要に応じて origin を限定してください）
app.use(
  '*',
  cors({
    origin: '*', // 例: 'http://localhost:5173' に変えると特定オリジンのみ許可
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/data', (c) => {
  const rows = 50;
  const cols = 20;
  const data: { row: string; col: string }[] = [];

  for (let r = 1; r <= rows; r++) {
    for (let ci = 1; ci <= cols; ci++) {
      data.push({ row: `row ${r}`, col: `column ${ci}` });
    }
  }

  return c.json(data);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
