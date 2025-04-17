import { User } from '../user/User';

export interface AuthUserRepository {
    findByEmail(email: string): Promise<User | null>;
    updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
}