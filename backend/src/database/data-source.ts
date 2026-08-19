import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env file
dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'kampung_coklat',
  entities: [
    join(__dirname, 'entities', '*.entity{.ts,.js}'),
    join(__dirname, '..', 'crm', 'entities', '*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  seeds: [join(__dirname, 'seeds', '*.seeder{.ts,.js}')],
  synchronize: false, // DO NOT USE TRUE IN PRODUCTION! Use migrations instead.
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
