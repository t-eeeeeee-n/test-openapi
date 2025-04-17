import { UserRepository } from '../../domain/user/UserRepository';
import {UserResponse} from "../../dto/user/UserResponse";
import {UpdateUserRequest} from "../../dto/user/UpdateUserRequest";

export class UpdateUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(user: UpdateUserRequest): Promise<UserResponse> {
        const res = await this.userRepo.update(user);
        return {id: res.id, name: res.name, email: res.email};
    }
}
