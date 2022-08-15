import {
    ConfigModule,
    ConfigService,
} from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmTestAsyncConfig: TypeOrmModuleAsyncOptions =
    {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (
            config: ConfigService,
        ): Promise<TypeOrmModuleOptions> => {
            config.get('ENV');
            return {
                type: 'postgres',
                host: config.get('DATABASE_HOST'),
                port: parseInt(
                    config.get('DATABASE_PORT'),
                ),
                username: config.get(
                    'DATABASE_USERNAME',
                ),
                password: config.get(
                    'DATABASE_PASSWORD',
                ),
                database: config.get(
                    'DATABASE_TEST_DATABASE',
                ),
                entities: [
                    __dirname +
                        '/../**/*.entity.{js,ts}',
                ],
                migrations: [
                    __dirname +
                        '/../database/migrations/*{.ts,.js}',
                ],
                synchronize: true,
                logging: false,
            };
        },
    };
