import AppError from '@shared/errors/appError';
import { NextFunction, Request, Response } from 'express';
import { CreateUserService } from '../services/create_user_service';
import { ListUsersService } from '../services/list_users_service';

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await ListUsersService.execute();
            return res.status(200).json({
                users,
            });
        } catch (error) {
            if (error instanceof AppError)
                return res
                    .status(error.statusCode)
                    .json({ error: error.message });
            else return res.status(400).json({ error: error });
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password } = req.body;

            const user = await CreateUserService.execute({
                name,
                email,
                password,
            });
            return res.status(200).json({
                user,
            });
        } catch (error) {
            if (error instanceof AppError) {
                const customError: AppError = error as AppError;
                console.log('entra aqui: ' + customError);
                return res.status(200).json({ error: customError.message });
            } else {
                return res.status(400).json({ error: error });
            }
        }
    }
}

export default new UserController();
