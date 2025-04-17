import {Body, Controller, Delete, Get, Path, Post, Put, Route, SuccessResponse, Tags} from 'tsoa';
import {CreateUserUseCase} from '../../application/user/CreateUserUseCase';
import {GetUserUseCase} from '../../application/user/GetUserUseCase';
import {GetUsersUseCase} from '../../application/user/GetUsersUseCase';
import {PrismaUserRepository} from '../../infrastructure/user/PrismaUserRepository'
import {DeleteUserUseCase} from "../../application/user/DeleteUserUseCase";
import {UpdateUserUseCase} from "../../application/user/UpdateUserUseCase";
import {CreateUserRequest} from '../../dto/user/CreateUserRequest';
import {UpdateUserRequest} from '../../dto/user/UpdateUserRequest';
import {UserResponse} from '../../dto/user/UserResponse';

@Route('users')
@Tags('users')
export class UserController extends Controller {
    private userRepo = new PrismaUserRepository();

    @Get('{userId}')
    async getUser(@Path() userId: string): Promise<UserResponse> {
        const useCase = new GetUserUseCase(this.userRepo);
        return useCase.execute(userId);
    }

    @SuccessResponse("201", "Created")
    @Post()
    async createUser(@Body() body: CreateUserRequest): Promise<UserResponse> {
        const useCase = new CreateUserUseCase(this.userRepo);
        const res = await useCase.execute(body);
        this.setStatus(201);
        return res;
    }

    @Get()
    async getUsers(): Promise<UserResponse[]> {
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
    @SuccessResponse("200", "Updated")
    async updateUser(@Body() body: UpdateUserRequest): Promise<UserResponse> {
        const useCase = new UpdateUserUseCase(this.userRepo);
        return await useCase.execute(body)
    }
}
