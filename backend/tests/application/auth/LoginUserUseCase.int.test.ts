import { PrismaClient } from '@prisma/client';
import { LoginUserUseCase } from '../../../src/application/auth/LoginUserUseCase';
import { PrismaAuthUserRepository } from '../../../src/infrastructure/auth/PrismaAuthUserRepository';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const repo = new PrismaAuthUserRepository();

describe('LoginUserUseCase (Integration)', () => {
    const useCase = new LoginUserUseCase(repo);

    beforeAll(async () => {
        await prisma.user.deleteMany({});
        const hashedPassword = await bcrypt.hash('password123', 10);
        await prisma.user.create({
            data: {
                name: 'ログイン太郎',
                email: 'login@example.com',
                password: hashedPassword,
            },
        });
    });

    afterAll(async () => {
        await prisma.user.deleteMany({});
        await prisma.$disconnect();
    });

    it('正しいメールとパスワードでログインできる', async () => {
        const result = await useCase.execute({
            email: 'login@example.com',
            password: 'password123',
        });

        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();
    });

    it('存在しないメールではエラーになる', async () => {
        await expect(
            useCase.execute({
                email: 'notfound@example.com',
                password: 'password123',
            })
        ).rejects.toThrow('Invalid email or password');
    });

    it('パスワードが間違っているとエラーになる', async () => {
        await expect(
            useCase.execute({
                email: 'login@example.com',
                password: 'wrongpass',
            })
        ).rejects.toThrow('Invalid email or password');
    });
});
