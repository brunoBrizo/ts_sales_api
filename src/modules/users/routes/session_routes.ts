import { Router } from 'express';
import sessions_controller from '../controllers/sessions_controller';
import { celebrate, Joi, Segments, errors } from 'celebrate';

const sessionRoutes = Router();

sessionRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessions_controller.create,
);

export default sessionRoutes;
