import { PrismaAuthUserRepository } from '../../../src/infrastructure/auth/PrismaAuthUserRepository';
import { RefreshTokenUseCase } from '../../../src/application/auth/RefreshTokenUseCase';
import { User } from '../../../src/domain/user/User';
import { generateRefreshToken } from '../../../src/utils/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('RefreshTokenUseCase', () => {
    let userId: string;
    let refreshToken: string;

    beforeAll(async () => {
        // Clean up test DB just in case
        await prisma.user.deleteMany();

        const passwordHash = await bcrypt.hash('password123', 10);
        const user = new User({
            name: 'テスト太郎',
            email: 'test@example.com',
            password: passwordHash
        });

        // 保存して ID 取得
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                refreshToken: ''
            }
        });

        refreshToken = generateRefreshToken(user.id);
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });

        userId = user.id;
    });

    it('リフレッシュトークンが正しければ新しいアクセストークンが返る', async () => {
        const repo = new PrismaAuthUserRepository();
        const useCase = new RefreshTokenUseCase(repo);

        const result = await useCase.execute(refreshToken);

        expect(result).toHaveProperty('accessToken');
        expect(typeof result.accessToken).toBe('string');
    });

    it('リフレッシュトークンが不正ならエラーになる', async () => {
        const repo = new PrismaAuthUserRepository();
        const useCase = new RefreshTokenUseCase(repo);

        await expect(useCase.execute('invalid.token')).rejects.toThrow('Invalid refresh token');
    });
});