import { UserRepository } from '../../domain/user/UserRepository';
import { User } from '../../domain/user/User';

export class UpdateUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(user: User): Promise<User> {
        await this.userRepo.update(user);
        return user;
    }
}
