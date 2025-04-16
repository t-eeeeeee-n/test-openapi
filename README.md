# test-openapi

Google拡張機能向けのフルスタックテンプレート。  
**Next.js + Express + Prisma + tsoa + orval構成**で、クリーンアーキテクチャベースの開発が可能です。

---

## 🚀 技術スタック

- **Frontend**: Next.js, TypeScript, Tailwind CSS, React Query, orval (OpenAPI Client)
- **Backend**: Express.js, TypeScript, tsoa (OpenAPI), Prisma (ORM)
- **Database**: SQLite（dev/test用）
- **API仕様**: OpenAPI (Swagger UI対応)
- **Testing**: Jest, Supertest
- **構成**: Clean Architecture（Domain, Application, Infrastructure, Presentation）

---

## ⚙️ セットアップ

```bash
git clone https://github.com/yourname/test-openapi.git
cd test-openapi
npm install
```

### Backend

```bash
cd backend
npm install
npx prisma migrate dev         # SQLite用DBマイグレーション
npm run tsoa:gen               # tsoaのroute & swagger生成
npm run dev                    # http://localhost:3001 起動
```

Swagger UI 👉 `http://localhost:3001/docs`

### Frontend

```bash
cd frontend
npm install
npx orval                     # OpenAPIからAPI Hooks生成
npm run dev                   # http://localhost:3002 起動
```

---

## 🧪 テスト

```bash
# ユースケース・API両方のテスト実行
cd backend
npx jest
```

---

## 📂 ディレクトリ構成（一部）

```
backend/
├── src/
│   ├── domain/            # Entity・Repository定義
│   ├── application/       # UseCase（ビジネスロジック）
│   ├── infrastructure/    # DBや外部連携
│   ├── presentation/      # tsoa Controller
│   ├── pkg/               # 共通util/logger/env/errorなど
│   ├── middleware/        # ErrorHandler等
│   ├── server.ts          # Expressエントリーポイント
│   └── swagger.json       # OpenAPI仕様
```

---

## 💬 補足メモ

- フロントとAPIはOpenAPIで完全連携（orvalで自動生成）
- DBはPrismaで永続化、テストではSQLite使用
- `logger` / `errors` / `env` は共通管理で拡張しやすい
- テスト環境用 `.env.test` に切り替えればDB分離OK

---
