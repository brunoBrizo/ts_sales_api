import AppError from '@shared/errors/appError';
import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../typeorm/repository/user_repository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    public static async execute({ name, email, password }: IRequest) {
        try {
            const userRepo = getCustomRepository(UserRepository);
            const userExists = await userRepo.findByEmail(email);
            if (userExists) {
                throw new AppError('Email is already in use', 400);
            }

            const hashedPassword = await hash(password, 8);
            const user = userRepo.create({
                name,
                email,
                password: hashedPassword,
            });
            await userRepo.save(user);

            return user;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
