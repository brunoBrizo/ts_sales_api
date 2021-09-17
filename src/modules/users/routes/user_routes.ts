import { Router } from 'express';
import user_controller from '../controllers/user_controller';
import { celebrate, Joi, Segments, errors } from 'celebrate';

const userRoutes = Router();

userRoutes.get('/', user_controller.getAll);

userRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    user_controller.createUser,
);

export default userRoutes;
