import { User } from './User';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  updateRefreshToken(userId: string, refreshToken: string | null): Promise<void>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}