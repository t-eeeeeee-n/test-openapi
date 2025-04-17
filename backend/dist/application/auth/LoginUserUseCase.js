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
exports.LoginUserUseCase = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
class LoginUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield this.userRepo.findByEmail(email);
            if (!user)
                throw new Error('Invalid email or password');
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Invalid email or password');
            const accessToken = (0, jwt_1.generateAccessToken)(user.id);
            const refreshToken = (0, jwt_1.generateRefreshToken)(user.id);
            yield this.userRepo.updateRefreshToken(user.id, refreshToken);
            return { accessToken, refreshToken };
        });
    }
}
exports.LoginUserUseCase = LoginUserUseCase;
