import { INestApplication } from '@nestjs/common';
import {
    SwaggerModule,
    DocumentBuilder,
} from '@nestjs/swagger';

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(
    app: INestApplication,
): void {
    const options = new DocumentBuilder()
        .setTitle('Hackathon Shop')
        .setDescription('Hackathon shop swagger')
        .setVersion('1.0.0')
        .build();

    const document = SwaggerModule.createDocument(
        app,
        options,
    );
    SwaggerModule.setup('swagger', app, document);
}
