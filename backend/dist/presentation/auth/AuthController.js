"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const PrismaAuthUserRepository_1 = require("../../infrastructure/auth/PrismaAuthUserRepository");
const RegisterUserUseCase_1 = require("../../application/auth/RegisterUserUseCase");
const LoginUserUseCase_1 = require("../../application/auth/LoginUserUseCase");
const RefreshTokenUseCase_1 = require("../../application/auth/RefreshTokenUseCase");
const LogoutUserUseCase_1 = require("../../application/auth/LogoutUserUseCase");
let AuthController = class AuthController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userRepo = new PrismaAuthUserRepository_1.PrismaAuthUserRepository();
    }
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new RegisterUserUseCase_1.RegisterUserUseCase(this.userRepo);
            const res = yield useCase.execute(body);
            this.setStatus(201);
            return res;
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new LoginUserUseCase_1.LoginUserUseCase(this.userRepo);
            const res = yield useCase.execute(body);
            this.setStatus(200);
            return res;
        });
    }
    refresh(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new RefreshTokenUseCase_1.RefreshTokenUseCase(this.userRepo);
            const res = yield useCase.execute(body.refreshToken);
            this.setStatus(200);
            return res;
        });
    }
    logout(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new LogoutUserUseCase_1.LogoutUserUseCase(this.userRepo);
            const res = yield useCase.execute(body.userId);
            this.setStatus(204);
            return res;
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)('register'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Post)('login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("200", "OK"),
    (0, tsoa_1.Post)('refresh-token'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("204", "No Content"),
    (0, tsoa_1.Post)('logout'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)('auth'),
    (0, tsoa_1.Tags)('auth')
], AuthController);
