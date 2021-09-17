import AppError from '@shared/errors/appError';
import { NextFunction, Request, Response } from 'express';
import { CreateProductService } from '../services/create_product_service';
import { DeleteProductService } from '../services/delete_product_service';
import { ListProductsService } from '../services/list_products_service';
import { ShowProductService } from '../services/show_product_service';
import { UpdateProductService } from '../services/update_product_service';

class ProductController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ListProductsService.execute();
            return res.status(200).json({
                products,
            });
        } catch (error) {
            if (error instanceof AppError)
                return res
                    .status(error.statusCode)
                    .json({ error: error.message });
            else return res.status(400).json({ error: error });
        }
    }

    public async getProductById(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({
                    error: 'Product Id cannot be empty',
                });
            const product = await ShowProductService.execute({ id });
            return res.status(200).json({
                product,
            });
        } catch (error) {
            console.log('aca el error: ' + error);
            if (error instanceof AppError)
                return res
                    .status(error.statusCode)
                    .json({ error2: error.message });
            else return res.status(400).json({ error: error });
        }
    }

    public async createProduct(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { name, price, quantity } = req.body;

            const product = await CreateProductService.execute({
                name,
                price,
                quantity,
            });
            return res.status(200).json({
                product,
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

    public async updateProduct(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const { name, price, quantity } = req.body;

            const product = await UpdateProductService.execute({
                id,
                name,
                price,
                quantity,
            });
            return res.status(200).json({
                product,
            });
        } catch (error) {
            if (error instanceof AppError)
                return res
                    .status(error.statusCode)
                    .json({ error: error.message });
            else return res.status(400).json({ error: error });
        }
    }

    public async deleteProduct(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            if (!id)
                res.status(400).json({
                    error: 'Product Id cannot be empty',
                });
            await DeleteProductService.execute({ id });
            return res.status(200).json();
        } catch (error) {
            if (error instanceof AppError)
                return res
                    .status(error.statusCode)
                    .json({ error: error.message });
            else return res.status(400).json({ error: error });
        }
    }
}

export default new ProductController();
