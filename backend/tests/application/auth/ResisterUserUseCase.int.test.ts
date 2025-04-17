import { PrismaAuthUserRepository } from '../../../src/infrastructure/auth/PrismaAuthUserRepository';
import { RegisterUserUseCase } from '../../../src/application/auth/RegisterUserUseCase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('RegisterUserUseCase (Integration)', () => {
    const repo = new PrismaAuthUserRepository();
    const useCase = new RegisterUserUseCase(repo);

    afterEach(async () => {
        await prisma.user.deleteMany({});
    });

    it('ユーザーを登録し、トークンを返す', async () => {
        const result = await useCase.execute({
            name: '統合テスト',
            email: 'inttest@example.com',
            password: 'securepass'
        });

        expect(result.accessToken).toBeDefined();
        expect(result.refreshToken).toBeDefined();

        const user = await prisma.user.findUnique({ where: { email: 'inttest@example.com' } });
        expect(user).not.toBeNull();
        expect(user?.name).toBe('統合テスト');
    });
});