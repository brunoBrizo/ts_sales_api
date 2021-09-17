import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repository/product_repository';

export class ListProductsService {
    public static async execute() {
        try {
            const productRepo = getCustomRepository(ProductRepository);
            const products = await productRepo.find();
            return products;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
