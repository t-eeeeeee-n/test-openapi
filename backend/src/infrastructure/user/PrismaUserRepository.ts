import {PrismaClient} from '@prisma/client';
import {UserRepository} from "../../domain/user/UserRepository";
import {UpdateUserRequest} from "../../dto/user/UpdateUserRequest";
import {CreateUserRequest} from "../../dto/user/CreateUserRequest";
import {User} from "../../domain/user/User";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async save(user: CreateUserRequest): Promise<User> {
        return prisma.user.create({data: user});
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await prisma.user.findUnique({where: { id } });
        return user ?? undefined;
    }

    async delete(id: string): Promise<void> {
        await prisma.user.delete({ where: { id } });
    }

    async update(data: UpdateUserRequest): Promise<User> {
        return prisma.user.update({
            where: {id: data.id},
            data: {name: data.name},
        });
    }
}
