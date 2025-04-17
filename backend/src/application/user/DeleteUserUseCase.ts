import { UserManagementRepository } from '../../domain/user/UserManagementRepository';

export class DeleteUserUseCase {
    constructor(private readonly userRepo: UserManagementRepository) {}

    async execute(id: string): Promise<void> {
        await this.userRepo.delete(id);
    }
}
