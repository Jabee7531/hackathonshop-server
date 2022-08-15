import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

describe('ShopController', () => {
    let controller: ShopController;

    const mockShopService = {
        create: jest.fn().mockResolvedValue(''),
        findAll: jest.fn().mockResolvedValue(''),
        findOne: jest.fn().mockResolvedValue(''),
        update: jest.fn().mockResolvedValue(''),
        remove: jest.fn().mockResolvedValue(''),
    };

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                controllers: [ShopController],
                providers: [ShopService],
            })
                .overrideProvider(ShopService)
                .useValue(mockShopService)
                .compile();

        controller = module.get<ShopController>(
            ShopController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
