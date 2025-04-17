import { AuthUserRepository } from '../../domain/auth/AuthUserRepository';

export class LogoutUserUseCase {
    constructor(private readonly userRepo: AuthUserRepository) {}

    async execute(userId: string): Promise<void> {
        await this.userRepo.updateRefreshToken(userId, null);
    }
}