import bcrypt from 'bcryptjs';
import { User } from '../../domain/user/User';
import { AuthUserRepository } from '../../domain/auth/AuthUserRepository';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

export class RegisterUserUseCase {
    constructor(private readonly userRepo: AuthUserRepository) {}

    async execute({ name, email, password }: { name: string; email: string; password: string }) {
        const existing = await this.userRepo.findByEmail(email);
        if (existing) throw new Error('User already exists');

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });

        await this.userRepo.save(user);

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.userRepo.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }
}