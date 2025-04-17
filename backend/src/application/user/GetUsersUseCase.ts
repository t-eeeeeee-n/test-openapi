import {UserManagementRepository} from '../../domain/user/UserManagementRepository';
import {UserResponse} from "../../dto/user/UserResponse";

export class GetUsersUseCase {
    constructor(private readonly userRepo: UserManagementRepository) {}

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
