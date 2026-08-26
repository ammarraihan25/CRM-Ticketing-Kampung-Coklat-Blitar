import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env file
dotenv.config();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'better-sqlite3' as any,
  database: 'kampung_coklat.sqlite',
  entities: [
    join(__dirname, 'entities', '*.entity{.ts,.js}'),
    join(__dirname, '..', 'crm', 'entities', '*.entity{.ts,.js}'),
    join(__dirname, '..', 'modules', 'config', 'entities', '*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  seeds: [join(__dirname, 'seeds', '*.seeder{.ts,.js}')],
  synchronize: true, // Auto-create tables for SQLite ease
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
