import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

export class GetUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(userId: string): Promise<User> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
