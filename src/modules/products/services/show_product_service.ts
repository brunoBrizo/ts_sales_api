import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repository/product_repository';

interface IRequest {
    id: string;
}

export class ShowProductService {
    public static async execute({ id }: IRequest) {
        try {
            const productRepo = getCustomRepository(ProductRepository);
            const product = await productRepo.findOne(id);
            if (!product) throw new AppError('Product not found', 404);
            return product;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
