import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/orm.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/common.exception';
import { ShopModule } from './shop/shop.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { NoticesModule } from './notices/notices.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'prod'
                    ? '.production.env'
                    : process.env.NODE_ENV ===
                      'stage'
                    ? '.stage.env'
                    : '.development.env',
        }),
        TypeOrmModule.forRootAsync(
            typeOrmAsyncConfig,
        ),
        UsersModule,
        ShopModule,
        AuthModule,
        EventsModule,
        NoticesModule,
    ],
    controllers: [],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
