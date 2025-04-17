import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

process.env.DATABASE_URL = 'postgresql://testuser:testpass@localhost:5433/testdb';

const prisma = new PrismaClient();

beforeAll(async () => {
    console.log('🧪 Syncing schema to test DB...');
    execSync('npx prisma db push'); // ここでスキーマをDBに適用
});

afterEach(async () => {
    await prisma.user.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});
