import { ConfigModule } from '@nestjs/config';
import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    const mockUserService = {
        // checkUser: jest.fn().mockResolvedValue(true)
    };
    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                controllers: [UsersController],
                providers: [UsersService],
            })
                .overrideProvider(UsersService)
                .useValue(mockUserService)
                .compile();

        controller = module.get<UsersController>(
            UsersController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
