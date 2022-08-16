import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/shop.entity';
import { ShopQuery } from './query/shop.query';

@Module({
    imports: [
        TypeOrmModule.forFeature([Products]),
    ],
    controllers: [ShopController],
    providers: [ShopService, ShopQuery],
})
export class ShopModule {}
