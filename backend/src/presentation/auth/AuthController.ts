import {Body, Controller, Post, Route, SuccessResponse, Tags,} from 'tsoa';
import {PrismaAuthUserRepository} from "../../infrastructure/auth/PrismaAuthUserRepository";
import {RegisterUserUseCase} from "../../application/auth/RegisterUserUseCase";
import {LoginUserUseCase} from "../../application/auth/LoginUserUseCase";
import {RefreshTokenUseCase} from "../../application/auth/RefreshTokenUseCase";
import {LogoutUserUseCase} from "../../application/auth/LogoutUserUseCase";
import {RegisterRequest} from "../../dto/auth/RegisterRequest";
import {TokenResponse} from "../../dto/auth/TokenResponse";
import {LoginRequest} from "../../dto/auth/LoginRequest";


@Route('auth')
@Tags('auth')
export class AuthController extends Controller {
    private userRepo = new PrismaAuthUserRepository();

    @SuccessResponse("201", "Created")
    @Post('register')
    public async register(@Body() body: RegisterRequest): Promise<TokenResponse> {
        const useCase = new RegisterUserUseCase(this.userRepo);
        const res = await useCase.execute(body);
        this.setStatus(201);
        return res;
    }

    @SuccessResponse("200", "OK")
    @Post('login')
    public async login(@Body() body: LoginRequest): Promise<TokenResponse> {
        const useCase = new LoginUserUseCase(this.userRepo);
        const res = await useCase.execute(body);
        this.setStatus(200);
        return res;
    }

    @SuccessResponse("200", "OK")
    @Post('refresh-token')
    public async refresh(@Body() body: { refreshToken: string }): Promise<{ accessToken: string }> {
        const useCase = new RefreshTokenUseCase(this.userRepo);
        const res = await useCase.execute(body.refreshToken);
        this.setStatus(200);
        return res;
    }

    @SuccessResponse("204", "No Content")
    @Post('logout')
    public async logout(@Body() body: { userId: string }): Promise<void> {
        const useCase = new LogoutUserUseCase(this.userRepo);
        const res = await useCase.execute(body.userId);
        this.setStatus(204);
        return res;
    }
}
