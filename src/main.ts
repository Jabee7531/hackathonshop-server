import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utils/swagger/setup';
import { HttpExceptionFilter } from './utils/common.exception';
import { ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');

async function bootstrap() {
    const app = await NestFactory.create(
        AppModule,
    );

    app.useGlobalFilters(
        new HttpExceptionFilter(),
    );
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    app.enableCors({
        origin: [
            process.env.CORS_ALLOWED_ORIGINS,
        ],
        methods: [
            'GET',
            'HEAD',
            'PUT',
            'PATCH',
            'POST',
            'DELETE',
        ],
        allowedHeaders: ['Content-Type'],
        credentials: true,
        optionsSuccessStatus: 204,
    });
    setupSwagger(app);

    await app.listen(3001);
}
bootstrap();
