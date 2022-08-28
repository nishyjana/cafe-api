import Cafe from '../cafe/cafe.entity';
import { Employee } from '../employee/Entity/employee.entity';
import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nishanthanjanarthanarajah',
  password: 'root',
  database: 'cafe-api',
  entities: [Cafe, Employee],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
