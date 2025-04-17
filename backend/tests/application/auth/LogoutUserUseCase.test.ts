import { LogoutUserUseCase } from '../../../src/application/auth/LogoutUserUseCase';
import { PrismaAuthUserRepository } from '../../../src/infrastructure/auth/PrismaAuthUserRepository';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { generateRefreshToken } from '../../../src/utils/jwt';
import { User } from '../../../src/domain/user/User';

const prisma = new PrismaClient();

describe('LogoutUserUseCase', () => {
    let userId: string;
    const repo = new PrismaAuthUserRepository();

    beforeAll(async () => {
        // 初期化
        await prisma.user.deleteMany();

        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = new User({
            name: 'ログアウト太郎',
            email: 'logout@example.com',
            password: hashedPassword
        });

        const refreshToken = generateRefreshToken(user.id);

        const createdUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                refreshToken
            }
        });

        userId = createdUser.id;
    });

    it('refreshToken が null に更新される', async () => {
        const useCase = new LogoutUserUseCase(repo);

        await useCase.execute(userId);

        const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
        expect(updatedUser?.refreshToken).toBeNull();
    });
});
