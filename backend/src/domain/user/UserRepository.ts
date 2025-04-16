import { User } from './User';

export interface UserRepository {
  save(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
  update(user: User): Promise<void>;
}