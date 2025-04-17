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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenUseCase = void 0;
const jwt_1 = require("../../utils/jwt");
class RefreshTokenUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    execute(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const user = yield this.userRepo.findById(payload.userId);
            if (!user || user.refreshToken !== refreshToken) {
                throw new Error('Invalid refresh token');
            }
            const accessToken = (0, jwt_1.generateAccessToken)(user.id);
            return { accessToken };
        });
    }
}
exports.RefreshTokenUseCase = RefreshTokenUseCase;
