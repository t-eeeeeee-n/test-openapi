import bcrypt from 'bcryptjs';
import { AuthUserRepository } from '../../domain/auth/AuthUserRepository';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export class LoginUserUseCase {
    constructor(private readonly userRepo: AuthUserRepository) {}

    async execute({ email, password }: { email: string; password: string }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.userRepo.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }
}
