import {UserRepository} from '../../domain/user/UserRepository';
import {UserResponse} from "../../dto/user/UserResponse";
import {CreateUserRequest} from "../../dto/user/CreateUserRequest";
import {User} from "../../domain/user/User";

export class CreateUserUseCase {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(req: CreateUserRequest): Promise<UserResponse> {
        const user = new User({ name: req.name, email: req.email, password: req.password });
        await this.userRepo.save(user);
        return {id: user.id, name: user.name, email: user.email};
    }
}