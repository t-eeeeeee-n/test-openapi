
# 🚀 API連携メモ（tsoa + orval）

## ✅ 使用技術スタック
- **バックエンド**: Express + TypeScript + TSOA
- **フロントエンド**: Next.js + TypeScript + TailwindCSS + orval + React Query
- **API仕様管理**: OpenAPI (swagger.json)

---

## 🔧 実行手順

### 1. バックエンド（tsoa）

- Controller を作成  
  - `@Route`, `@Get`, `@Post`, `@Tags`, `@Body`, `@Path` などを使用
- `tsoa.json` を設定
- `npm run tsoa:gen` を実行  
  - `swagger.json`（OpenAPI仕様）  
  - `routes.ts`（Express用ルーティング）が生成される

```bash
npm run tsoa:gen
```

---

### 2. フロントエンド（orval）

- `orval.config.ts` を作成して `swagger.json` を読み込む設定を書く
- `npm install @tanstack/react-query` を実行（React Query用）
- `npx orval` を実行  
  - `src/api/` に型付きAPIクライアント & Hooksが生成される

```bash
npx orval
```

---

### 3. API クライアントの利用

```tsx
import { useGetUser } from '@/api/users/users';

const { data, isLoading, error } = useGetUser("123");
```

- 自動生成された hook を使ってデータ取得
- カスタム fetcher で API ベースURL を設定（例: `http://localhost:3001`）

---

### 4. CORS対応（Express側）

- `npm install cors`
- `app.use(cors())` を追加

---

## ✅ 結果

- API仕様 → コード（orval）連携の自動化に成功
- フロントとバックが型安全に接続できる環境が構築完了
- swagger.json の更新からフロント反映までがワンコマンド化

---
