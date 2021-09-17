import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async findByName(name: string) {
        const user = await this.findOne({
            where: {
                name: name,
            },
        });
        return user;
    }

    public async findByEmail(email: string) {
        const user = await this.findOne({
            where: {
                email,
            },
        });
        return user;
    }

    public async findById(id: string) {
        const user = await this.findOne({
            where: {
                id,
            },
        });
        return user;
    }
}
