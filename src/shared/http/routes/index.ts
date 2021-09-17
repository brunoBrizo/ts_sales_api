import productRoutes from '@modules/products/routes/product_routes';
import userRoutes from '@modules/users/routes/user_routes';
import sessionRoutes from '@modules/users/routes/session_routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
