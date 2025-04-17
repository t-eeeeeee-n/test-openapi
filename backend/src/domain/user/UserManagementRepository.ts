import { UpdateUserRequest } from '../../dto/user/UpdateUserRequest';
import {CreateUserRequest} from "../../dto/user/CreateUserRequest";
import {User} from "./User";

export interface UserManagementRepository {
    save(user: CreateUserRequest): Promise<User>;
    findById(id: string): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    delete(id: string): Promise<void>;
    update(data: UpdateUserRequest): Promise<User>;
}