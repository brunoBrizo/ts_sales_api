import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repository/product_repository';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export class CreateProductService {
    public static async execute({ name, price, quantity }: IRequest) {
        try {
            const productRepo = getCustomRepository(ProductRepository);
            const productExists = await productRepo.findByName(name);
            console.log('product exists: ' + productExists?.id);
            if (productExists) {
                throw new AppError('Product ' + name + ' already exists', 400);
            }

            const product = productRepo.create({
                name,
                price,
                quantity,
            });
            await productRepo.save(product);
            return product;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
