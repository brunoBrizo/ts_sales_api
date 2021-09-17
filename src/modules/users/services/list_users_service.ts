import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repository/user_repository';

export class ListUsersService {
    public static async execute() {
        try {
            const userRepo = getCustomRepository(UserRepository);
            const users = await userRepo.find();

            return users;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
