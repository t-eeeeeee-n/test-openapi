import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';

export class CreateUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(name: string): Promise<User> {
        const user: User = {
            id: (Math.random() * 1000000).toFixed(0),
            name,
        };
        await this.userRepo.save(user);
        return user;
    }
}