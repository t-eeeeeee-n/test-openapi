import { Body, Controller, Post, Route, Tags, } from 'tsoa';
import { AuthService } from '../../application/auth/AuthService';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

@Route('auth')
@Tags('auth')
export class AuthController extends Controller {
    private service = new AuthService();

    @Post('register')
    public async register(@Body() body: RegisterRequest): Promise<TokenResponse> {
        return this.service.register(body);
    }

    @Post('login')
    public async login(@Body() body: LoginRequest): Promise<TokenResponse> {
        return this.service.login(body);
    }

    @Post('refresh-token')
    public async refresh(@Body() body: { refreshToken: string }): Promise<{ accessToken: string }> {
        return this.service.refreshAccessToken(body.refreshToken);
    }

    @Post('logout')
    public async logout(@Body() body: { userId: string }): Promise<void> {
        return this.service.logout(body.userId);
    }
}
