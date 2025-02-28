import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Medicine } from './medicine/medicine.entity';

config();

export const MedicineDataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    entities: [Medicine],
    migrations: [__dirname + '/migrations/**/*.ts'],
    synchronize: false,
});
