import bcrypt from 'bcryptjs';
import {User} from "../../domain/user/User";
import {UserRepository} from "../../domain/user/UserRepository";
import {generateAccessToken, generateRefreshToken, verifyRefreshToken,} from '../../utils/jwt';
import {PrismaAuthUserRepository} from "../../infrastructure/auth/PrismaAuthUserRepository";

export class AuthService {
    private userRepo: UserRepository = new PrismaAuthUserRepository();

    async register({ name, email, password }: { name: string; email: string; password: string }) {
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

    async login({ email, password }: { email: string; password: string }) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) throw new Error('Invalid email or password');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid email or password');

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        await this.userRepo.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }

    async refreshAccessToken(refreshToken: string) {
        const payload = verifyRefreshToken(refreshToken);
        const user = await this.userRepo.findById(payload.userId);
        if (!user || user.refreshToken !== refreshToken) throw new Error('Invalid refresh token');

        const newAccessToken = generateAccessToken(user.id);
        return { accessToken: newAccessToken };
    }

    async logout(userId: string) {
        await this.userRepo.updateRefreshToken(userId, null); // refreshTokenを無効化
    }
}
