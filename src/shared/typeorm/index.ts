import { createConnection } from 'typeorm';

class DBConnection {
    public async connect() {
        try {
            await createConnection();
            console.log('Connected to DB!');
        } catch (error) {
            throw error;
        }
    }
}

export default new DBConnection();
