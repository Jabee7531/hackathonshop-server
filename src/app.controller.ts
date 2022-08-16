import { Controller, Get } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiTags,
    getSchemaPath,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { Users } from './users/entities/users.entity';

@Controller()
@ApiTags('Swagger Example')
export class AppController {
    constructor(
        private readonly appService: AppService,
    ) {}

    @Get()
    @ApiOperation({
        summary: 'Print HelloWorld',
        description: 'Hello World',
    })
    @ApiResponse({
        status: 200,
        description: '출력 성공!',
        schema: {
            example: {
                id: 'cea1d926-6f1b-4a37-a46c-8ddf0b17a0bc',
                user_id: 'Ryan',
                salt: '임시',
                name: 'Ryan',
                age: 25,
                createdAt:
                    '2021-12-25T23:30:51.371Z',
                updatedAt:
                    '2021-12-25T23:30:51.371Z',
                deletedAt: null,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNlYTFkOTI2LTZmMWItNGEzNy1hNDZjLThkZGYwYjE3YTBiYyIsInVzZXJfaWQiOiJSeWFuIiwic2FsdCI6IuyehOyLnCIsIm5hbWUiOiJSeWFuIiwiYWdlIjoyNSwiY3JlYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwidXBkYXRlZEF0IjoiMjAyMS0xMi0yNVQyMzozMDo1MS4zNzFaIiwiZGVsZXRlZEF0IjpudWxsLCJpYXQiOjE2NDA1MDc0NzMsImV4cCI6MTY0MDUwNzUzM30.gm-Yf_C8szEOvcy-bK-r-CP4Nz6aCr1AgqvH8KonxvU',
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: '유저 응답',
        type: Users,
    })
    @ApiResponse({
        status: 202,
        description: '유저 array 응답',
        type: [Users],
    })
    @ApiResponse({
        status: 203,
        description: '유저 array 응답',
        schema: {
            type: 'array',
            items: {
                oneOf: [
                    {
                        $ref: getSchemaPath(
                            Users,
                        ),
                    },
                    {
                        $ref: getSchemaPath(
                            Users,
                        ),
                    },
                ],
            },
        },
    })
    @ApiResponse({
        status: 204,
        description: '유저 array 응답',
        schema: {
            oneOf: [
                {
                    $ref: getSchemaPath(Users),
                },
                {
                    $ref: getSchemaPath(Users),
                },
            ],
        },
    })
    getHello(): string {
        return this.appService.getHello();
    }
}
