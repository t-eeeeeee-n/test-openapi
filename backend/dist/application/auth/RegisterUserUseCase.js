"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../../domain/user/User");
const jwt_1 = require("../../utils/jwt");
class RegisterUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const existing = yield this.userRepo.findByEmail(email);
            if (existing)
                throw new Error('User already exists');
            const hashed = yield bcryptjs_1.default.hash(password, 10);
            const user = new User_1.User({ name, email, password: hashed });
            yield this.userRepo.save(user);
            const accessToken = (0, jwt_1.generateAccessToken)(user.id);
            const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
            yield this.userRepo.updateRefreshToken(user.id, refreshToken);
            return { accessToken, refreshToken };
        });
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
