import { Controller, Get, Post, Route, Tags, Body, Path, Delete, SuccessResponse, Put } from 'tsoa';
import { User } from '../../domain/user/User';
import { CreateUserUseCase } from '../../application/user/CreateUserUseCase';
import { GetUserUseCase } from '../../application/user/GetUserUseCase';
import { GetUsersUseCase } from '../../application/user/GetUsersUseCase';
import { PrismaUserRepository } from '../../infrastructure/user/PrismaUserRepository'
import {DeleteUserUseCase} from "../../application/user/DeleteUserUseCase";
import {UpdateUserUseCase} from "../../application/user/UpdateUserUseCase";

interface CreateUserRequest {
    name: string;
}

interface UpdateUserRequest {
    id: string;
    name: string;
}

@Route('users')
@Tags('users')
export class UserController extends Controller {
    private userRepo = new PrismaUserRepository();

    @Get('{userId}')
    async getUser(@Path() userId: string): Promise<User> {
        const useCase = new GetUserUseCase(this.userRepo);
        return useCase.execute(userId);
    }

    @Post()
    async createUser(@Body() body: CreateUserRequest): Promise<User> {
        const useCase = new CreateUserUseCase(this.userRepo);
        return useCase.execute(body.name);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        const useCase = new GetUsersUseCase(this.userRepo);
        return useCase.execute();
    }

    @Delete('{userId}')
    @SuccessResponse('204', 'No Content')
    async deleteUser(@Path() userId: string): Promise<void> {
        const useCase = new DeleteUserUseCase(this.userRepo);
        await useCase.execute(userId);
    }

    @Put()
    async updateUser(@Body() body: UpdateUserRequest): Promise<User> {
        const useCase = new UpdateUserUseCase(this.userRepo);
        return useCase.execute({
            id: body.id,
            name: body.name,
        });
    }
}
