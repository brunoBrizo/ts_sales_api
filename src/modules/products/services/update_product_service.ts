import AppError from '@shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repository/product_repository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {
    public static async execute({ id, name, price, quantity }: IRequest) {
        try {
            const productRepo = getCustomRepository(ProductRepository);

            const product = await productRepo.findOne(id);
            if (!product) throw new AppError('Product not found', 404);
            const productExists = await productRepo.findByName(name);
            console.log('aca llega: ' + productExists);
            if (productExists)
                throw new AppError('Product already exists', 400);

            product.name = name;
            product.price = price;
            product.quantity = quantity;
            await productRepo.save(product);
            return product;
        } catch (error) {
            throw new AppError('Error: ' + error, 400);
        }
    }
}
