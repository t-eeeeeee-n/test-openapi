import { CreateUserUseCase } from '../../src/application/user/CreateUserUseCase';
import {UserRepository} from "../../src/domain/user/UserRepository";

describe('CreateUserUseCase', () => {
    const mockRepo: jest.Mocked<UserRepository> = {
        save: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        delete: jest.fn(),
        update: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create and return a user', async () => {
        const useCase = new CreateUserUseCase(mockRepo);
        const result = await useCase.execute('ユニットテスト太郎');

        expect(result.name).toBe('ユニットテスト太郎');
        expect(result.id).toBeDefined();
        expect(mockRepo.save).toHaveBeenCalledWith(result);
    });
});
