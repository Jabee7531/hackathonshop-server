import { ConfigModule } from '@nestjs/config';
import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule =
            await Test.createTestingModule({
                imports: [
                    ConfigModule.forRoot({
                        isGlobal: true,
                        envFilePath:
                            process.env
                                .NODE_ENV ===
                            'prod'
                                ? '.production.env'
                                : process.env
                                      .NODE_ENV ===
                                  'stage'
                                ? '.stage.env'
                                : '.development.env',
                    }),
                ],
                controllers: [AppController],
                providers: [AppService],
            }).compile();

        appController = app.get<AppController>(
            AppController,
        );
    });
});
