import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleAuthService } from '../lib/auth/google/getGoogleProfile';
import { Users } from './entities/users.entity';
import { SocialAccounts } from './entities/socialAccounts.entity';
import {
    ConfigModule,
    ConfigService,
} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserQuery } from './query/users.query';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (
                configService: ConfigService,
            ) => ({
                secret: configService.get(
                    'JWT_SECRET',
                ),
                signOptions: {
                    expiresIn: `${configService.get(
                        'JWT_EXPIRATION_TIME',
                    )}s`,
                },
            }),
        }),
        TypeOrmModule.forFeature([
            Users,
            SocialAccounts,
        ]),
    ],
    controllers: [UsersController],
    providers: [
        UsersService,
        GoogleAuthService,
        UserQuery,
    ],
})
export class UsersModule {}
