import {UserRepository} from '../../domain/user/UserRepository';
import {UserResponse} from "../../dto/user/UserResponse";

export class GetUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(userId: string): Promise<UserResponse> {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return {id: user.id, name: user.name, email: user.email};
    }
}
