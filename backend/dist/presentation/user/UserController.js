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
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const CreateUserUseCase_1 = require("../../application/user/CreateUserUseCase");
const GetUserUseCase_1 = require("../../application/user/GetUserUseCase");
const GetUsersUseCase_1 = require("../../application/user/GetUsersUseCase");
const PrismaUserRepository_1 = require("../../infrastructure/user/PrismaUserRepository");
const DeleteUserUseCase_1 = require("../../application/user/DeleteUserUseCase");
const UpdateUserUseCase_1 = require("../../application/user/UpdateUserUseCase");
let UserController = class UserController extends tsoa_1.Controller {
    constructor() {
        super(...arguments);
        this.userRepo = new PrismaUserRepository_1.PrismaUserRepository();
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetUserUseCase_1.GetUserUseCase(this.userRepo);
            return useCase.execute(userId);
        });
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new CreateUserUseCase_1.CreateUserUseCase(this.userRepo);
            const res = yield useCase.execute(body);
            this.setStatus(201);
            return res;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new GetUsersUseCase_1.GetUsersUseCase(this.userRepo);
            return useCase.execute();
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new DeleteUserUseCase_1.DeleteUserUseCase(this.userRepo);
            yield useCase.execute(userId);
        });
    }
    updateUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const useCase = new UpdateUserUseCase_1.UpdateUserUseCase(this.userRepo);
            return yield useCase.execute(body);
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)('{userId}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, tsoa_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Delete)('{userId}'),
    (0, tsoa_1.SuccessResponse)('204', 'No Content'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Put)(),
    (0, tsoa_1.SuccessResponse)("200", "Updated"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)('users'),
    (0, tsoa_1.Tags)('users')
], UserController);
