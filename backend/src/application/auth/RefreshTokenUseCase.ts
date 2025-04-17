import { AuthUserRepository } from '../../domain/auth/AuthUserRepository';
import { verifyRefreshToken, generateAccessToken } from '../../utils/jwt';

export class RefreshTokenUseCase {
    constructor(private readonly userRepo: AuthUserRepository) {}

    async execute(refreshToken: string) {
        const payload = verifyRefreshToken(refreshToken);
        const user = await this.userRepo.findById(payload.userId);

        if (!user || user.refreshToken !== refreshToken) {
            throw new Error('Invalid refresh token');
        }

        const accessToken = generateAccessToken(user.id);
        return { accessToken };
    }
}
