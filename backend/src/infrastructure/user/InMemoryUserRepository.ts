import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

const users: User[] = [{ id: '123', name: 'Test User' }];

export class InMemoryUserRepository implements UserRepository {
    async save(user: User): Promise<void> {
        users.push(user);
    }

    async findAll(): Promise<User[]> {
        return users;
    }

    async findById(id: string): Promise<User | undefined> {
        return users.find((u) => u.id === id);
    }

    async delete(id: string): Promise<void> {
        const index = users.findIndex((u) => u.id === id);
        if (index !== -1) {
            users.splice(index, 1);
        }
    }

    async update(user: User): Promise<void> {
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
            users[index] = user;
        }
    }
}