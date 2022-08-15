import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    Req,
    Query,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { QueryShopDto } from './dto/query-shop.dto';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService,
    ) {}

    @ApiOperation({
        summary: '물품 여러개 추가',
        description: '물품 추가',
    })
    @ApiResponse({
        status: 201,
        description: '성공',
        schema: {
            example: {
                statusCode: 201,
                message: 'success',
                result: {
                    product: [
                        {
                            id: 'string',
                            name: 'string',
                            category: ['string'],
                            price: 'string',
                            size: ['string'],
                            color: ['string'],
                            liked: 0,
                            brand: 'string',
                            thumbnail: 'string',
                            photos: ['string'],
                            updated_at:
                                '2022-07-26T12:17:08.511Z',
                            created_at:
                                '2022-07-26T12:17:08.511Z',
                        },
                    ],
                },
            },
        },
    })
    @ApiResponse({
        status: 400001,
        description: 'Transaction 실패',
        schema: {
            example: {
                statusCode: 400,
                message: '400001',
                error: 'Bad Request',
            },
        },
    })
    @ApiBody({
        type: CreateShopDto,
        isArray: true,
    })
    @Post('creates')
    async creates(
        @Req() request: Request,
        @Res() response: Response,
        @Body() createsShopDto: CreateShopDto[],
    ) {
        const product =
            await this.shopService.creates(
                createsShopDto,
            );

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                product: product,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '물품 추가',
        description: '물품 추가',
    })
    @ApiResponse({
        status: 201,
        description: '성공',
        schema: {
            example: {
                statusCode: 201,
                message: 'success',
                result: {
                    product: {
                        id: 'string',
                        name: 'string',
                        category: ['string'],
                        price: 'string',
                        size: ['string'],
                        color: ['string'],
                        liked: 0,
                        brand: 'string',
                        thumbnail: 'string',
                        photos: ['string'],
                        updated_at:
                            '2022-07-26T12:17:08.511Z',
                        created_at:
                            '2022-07-26T12:17:08.511Z',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400001,
        description: 'Transaction 실패',
        schema: {
            example: {
                statusCode: 400,
                message: '400001',
                error: 'Bad Request',
            },
        },
    })
    @ApiBody({ type: CreateShopDto })
    @Post()
    async create(
        @Req() request: Request,
        @Res() response: Response,
        @Body() createShopDto: CreateShopDto,
    ) {
        const product =
            await this.shopService.create(
                createShopDto,
            );

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                product: product,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '결제 성공',
        description: '결제 성공',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    title: '성공적으로 구매했습니다',
                    data: 'toss.data',
                },
            },
        },
    })
    @ApiResponse({
        status: 400002,
        description: '결제 인증 실패',
        schema: {
            example: {
                statusCode: 400,
                message: '400002',
                error: 'Bad Request',
            },
        },
    })
    @Get('/payment/success')
    async successBuy(
        @Req() request: Request,
        @Res() response: Response,
        @Query() paymentDto: PaymentDto,
    ) {
        const toss =
            await this.shopService.checkPayment(
                paymentDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                title: '성공적으로 구매했습니다',
                data: toss.data,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '결제 실패',
        description: '결제 실패',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    message:
                        'request.query.message',
                    statusCode:
                        'request.query.code',
                },
            },
        },
    })
    @Get('/payment/fail')
    async failBuy(
        @Req() request: Request,
        @Res() response: Response,
    ) {
        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                message: request.query.message,
                statusCode: request.query.code,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '물품 쿼리 조회',
        description: '물품 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    products: [
                        {
                            id: 'string',
                            name: 'string',
                            category: ['string'],
                            price: 'string',
                            size: ['string'],
                            color: ['string'],
                            liked: 0,
                            brand: 'string',
                            thumbnail: 'string',
                            photos: ['string'],
                            updated_at:
                                '2022-07-26T12:17:08.511Z',
                            created_at:
                                '2022-07-26T12:17:08.511Z',
                        },
                    ],
                },
            },
        },
    })
    @Get('/query')
    async findQuery(
        @Req() request: Request,
        @Res() response: Response,
        @Query() productQueryDto: QueryShopDto,
    ) {
        const products =
            await this.shopService.findQuery(
                productQueryDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                products: products,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '물품 조회',
        description: '물품 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    product: {
                        id: 'string',
                        name: 'string',
                        category: ['string'],
                        price: 'string',
                        size: ['string'],
                        color: ['string'],
                        liked: 0,
                        brand: 'string',
                        thumbnail: 'string',
                        photos: ['string'],
                        updated_at:
                            '2022-07-26T12:17:08.511Z',
                        created_at:
                            '2022-07-26T12:17:08.511Z',
                    },
                },
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '조회 할 물품',
    })
    @Get(':id')
    async findOne(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const product =
            await this.shopService.findOne(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                product: product,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '물품 전체 조회',
        description: '물품 전체 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    products: [
                        {
                            id: 'string',
                            name: 'string',
                            category: ['string'],
                            price: 'string',
                            size: ['string'],
                            color: ['string'],
                            liked: 0,
                            brand: 'string',
                            thumbnail: 'string',
                            photos: ['string'],
                            updated_at:
                                '2022-07-26T12:17:08.511Z',
                            created_at:
                                '2022-07-26T12:17:08.511Z',
                        },
                    ],
                },
            },
        },
    })
    @Get()
    async findAll(
        @Req() request: Request,
        @Res() response: Response,
    ) {
        const products =
            await this.shopService.findAll();

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                products: products,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '물품 업데이트',
        description: '물품 업데이트',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    updatedProduct: {
                        id: 'string',
                        name: 'string',
                        category: ['string'],
                        price: 'string',
                        size: ['string'],
                        color: ['string'],
                        liked: 0,
                        brand: 'string',
                        thumbnail: 'string',
                        photos: ['string'],
                        updated_at:
                            '2022-07-26T12:17:08.511Z',
                        created_at:
                            '2022-07-26T12:17:08.511Z',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400001,
        description: 'Transaction 실패',
        schema: {
            example: {
                statusCode: 400,
                message: '400001',
                error: 'Bad Request',
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '업데이트 할 물품',
    })
    @ApiBody({ type: UpdateShopDto })
    @Patch(':id')
    async update(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
        @Body() updateShopDto: UpdateShopDto,
    ) {
        const updatedProduct =
            await this.shopService.update(
                id,
                updateShopDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                updatedProduct: updatedProduct,
            },
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '물품 삭제',
        description: '물품 삭제',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    deletedProduct: {
                        id: 'string',
                        name: 'string',
                        category: ['string'],
                        price: 'string',
                        size: ['string'],
                        color: ['string'],
                        liked: 0,
                        brand: 'string',
                        thumbnail: 'string',
                        photos: ['string'],
                        updated_at:
                            '2022-07-26T12:17:08.511Z',
                        created_at:
                            '2022-07-26T12:17:08.511Z',
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 400001,
        description: 'Transaction 실패',
        schema: {
            example: {
                statusCode: 400,
                message: '400001',
                error: 'Bad Request',
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '삭제할 할 물품',
    })
    @Delete(':id')
    async remove(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const deletedProduct =
            await this.shopService.remove(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                deletedProduct: deletedProduct,
            },
        };

        return response.status(200).send(result);
    }
}
