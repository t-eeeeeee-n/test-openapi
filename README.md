# Test OpenAPI Fullstack App 🚀

Google拡張機能の開発に向けた、Next.js × Express × Prisma × OpenAPI を使ったフルスタックアプリケーション。

## 📦 Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + React Query
- **Backend**: Express + TypeScript + tsoa
- **DB**: PostgreSQL（Prisma ORM）
- **API定義**: OpenAPI 3.0（tsoa → orval）
- **APIドキュメント**: Swagger UI
- **Docker**: Compose対応（dev/prod両対応）
- **Hosting**
  - Frontend: Vercel
  - Backend + DB: Railway

---

## 🌐 本番環境

| サービス  | URL |
|-----------|-----|
| Frontend | https://test-openapi-iihis857y-tens-projects-e11f752a.vercel.app/ |
| Backend  | https://your-backend.up.railway.app |
| Swagger  | https://your-backend.up.railway.app/docs |

---

## 🧱 機能概要

- ✅ ユーザー一覧取得（GET /users）
- ✅ ユーザー登録（POST /users）
- ✅ ユーザー削除（DELETE /users/{userId}）
- ✅ Swagger UI による自動APIドキュメント生成
- ✅ Prismaによる型安全なDBアクセス
- ✅ orvalによるフロント側API自動生成
- ✅ Docker Compose による開発環境統一

---

## 🧪 開発中にやったこと（タスクログ風）

- [x] tsoa導入でOpenAPI自動生成
- [x] Swagger UIで `/docs` エンドポイント表示
- [x] orvalでReact Query Hooksを自動生成
- [x] `useGetUser`, `useCreateUser` などをUIで使用
- [x] Prismaでスキーマ定義→マイグレーション
- [x] Jestでユースケース単体テスト
- [x] Clean Architecture導入（domain / application / infra / presentation）
- [x] Railway + Vercel で CI/CD 本番連携！

---

## 🐳 Docker 開発

```bash
# 開発用起動
docker-compose up --build

# フロント： http://localhost:3000
# バックエンド： http://localhost:3001
# Swagger: http://localhost:3001/docs
```

---

## 🔐 環境変数

`.env`, `.env.local`, `.env.test` など

```env
DATABASE_URL=postgres://devuser:devpass@db:5432/devdb
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## 🛠 今後のアイデア

- [ ] JWTログイン対応
- [ ] ログ出力・監視（Sentry, Logtailなど）
- [ ] Github ActionsでのCI/CD
- [ ] StorybookによるUIコンポーネント管理
- [ ] バリデーション強化（Zodなど）

---

## 👏 Special Thanks

このREADMEはプロジェクト構築の流れを元に作成されました。  
この内容は自己学習・共有・ポートフォリオなど自由に再利用可能です！

---

## 📁 ディレクトリ構成（backend）

```
backend/
├── src/
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   ├── presentation/
│   ├── controllers/
│   ├── routes.ts
│   └── server.ts
├── prisma/
├── tests/
├── Dockerfile
├── entrypoint.sh
└── ...
```
