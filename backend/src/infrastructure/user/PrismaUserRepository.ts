import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        await prisma.user.create({ data: user });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ?? undefined;
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

    async update(user: User): Promise<void> {
        await prisma.user.update({
            where: { id: user.id },
            data: { name: user.name },
        });
    }
}
