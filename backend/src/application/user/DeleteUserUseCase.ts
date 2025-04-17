import { UserRepository } from '../../domain/user/UserRepository';

export class DeleteUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
