import { User } from '../../domain/user/User';
import { UserRepository } from '../../domain/user/UserRepository';

export class GetUsersUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(): Promise<User[]> {
        return this.userRepo.findAll();
    }
}
