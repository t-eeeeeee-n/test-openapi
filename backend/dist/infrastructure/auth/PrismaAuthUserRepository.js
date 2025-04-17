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
exports.PrismaAuthUserRepository = void 0;
const client_1 = require("@prisma/client");
const User_1 = require("../../domain/user/User");
const prisma = new client_1.PrismaClient();
class PrismaAuthUserRepository {
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            return user ? new User_1.User(user) : null;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.create({ data: user });
        });
    }
    updateRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.update({
                where: { id: userId },
                data: { refreshToken },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { id } });
            return user ? new User_1.User(user) : null;
        });
    }
}
exports.PrismaAuthUserRepository = PrismaAuthUserRepository;
