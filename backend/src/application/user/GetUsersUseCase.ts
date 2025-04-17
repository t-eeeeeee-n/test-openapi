import {UserRepository} from '../../domain/user/UserRepository';
import {UserResponse} from "../../dto/user/UserResponse";

export class GetUsersUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(): Promise<UserResponse[]> {
        const users = this.userRepo.findAll()
        if (!users) {
            throw new Error("User not found");
        }
        return (await users).map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
        }));
    }
}
