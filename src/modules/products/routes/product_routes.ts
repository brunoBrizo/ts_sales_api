import { Router } from 'express';
import product_controller from '../controllers/product_controller';
import { celebrate, Joi, Segments, errors } from 'celebrate';

const productRoutes = Router();

productRoutes.get('/', product_controller.getAll);

productRoutes.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    product_controller.getProductById,
);

productRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    product_controller.createProduct,
);

productRoutes.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    product_controller.updateProduct,
);

productRoutes.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    product_controller.createProduct,
);

export default productRoutes;
