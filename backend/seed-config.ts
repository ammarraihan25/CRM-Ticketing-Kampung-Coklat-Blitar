import 'dotenv/config';
import dataSource from './src/database/data-source';
import TicketsRidesSeeder from './src/database/seeds/tickets-rides.seeder';

async function seed() {
  await dataSource.initialize();
  const seeder = new TicketsRidesSeeder();
  await seeder.run(dataSource);
  console.log("Seeded successfully");
  await dataSource.destroy();
}
seed().catch(console.error);
