import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/user/User';
import { AuthUserRepository } from '../../domain/auth/AuthUserRepository';

const prisma = new PrismaClient();

export class PrismaAuthUserRepository implements AuthUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? new User(user) : null;
    }

    async save(user: User): Promise<void> {
        await prisma.user.create({ data: user });
    }

    async updateRefreshToken(userId: string, refreshToken: string | null): Promise<void> {
        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken },
        });
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? new User(user) : null;
    }
}
