import { DataSource } from 'typeorm';

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    entities: [
        __dirname + '/../**/*.entity.{js,ts}',
    ],
    migrations: [
        __dirname +
            '/../database/migrations/*{.ts,.js}',
    ],
    synchronize: false,
    logging: true,
});
