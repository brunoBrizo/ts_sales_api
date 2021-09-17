import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    public async findByName(name: string) {
        const product = await this.findOne({
            where: {
                name: name,
            },
        });
        return product;
    }
}
