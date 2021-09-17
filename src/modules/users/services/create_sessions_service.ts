import AppError from '@shared/errors/appError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/user';
import { UserRepository } from '../typeorm/repository/user_repository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

export class CreateSessionsService {
    public static async execute({
        email,
        password,
    }: IRequest): Promise<IResponse> {
        try {
            const userRepo = getCustomRepository(UserRepository);
            const user = await userRepo.findByEmail(email);
            const authError = new AppError('Authentication failed', 400);
            if (!user) {
                throw authError;
            }
            const passwordConfirmed = await compare(password, user.password);

            if (!passwordConfirmed) {
                throw authError;
            }
            const token = sign(
                { user: user.id },
                '080aab5dd6e6369991e1c17cc7c',
                { expiresIn: '7d' },
            );

            return { user, token };
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
