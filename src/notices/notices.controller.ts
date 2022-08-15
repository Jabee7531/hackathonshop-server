import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Req,
    Res,
    Query,
} from '@nestjs/common';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PageOptionsDto } from '../common/dto/pageOption.dto';

@ApiTags('notice')
@Controller('notices')
export class NoticesController {
    constructor(
        private readonly noticesService: NoticesService,
    ) {}

    @ApiOperation({
        summary: '공지 게시글 추가',
        description: '게시글 추가',
    })
    @ApiResponse({
        status: 201,
        description: '성공',
        schema: {
            example: {
                statusCode: 201,
                message: '201000',
                result: {
                    notice: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T13:26:27.602Z',
                        created_at:
                            '2022-07-26T13:26:27.602Z',
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
    @ApiBody({ type: CreateNoticeDto })
    @Post()
    async create(
        @Req() request: Request,
        @Res() response: Response,
        @Body() createNoticeDto: CreateNoticeDto,
    ) {
        const notice =
            await this.noticesService.create(
                createNoticeDto,
            );

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                notice: notice,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '공지 게시글 전체 조회',
        description: '게시글 전체 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    notices: [
                        {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T13:26:27.602Z',
                            created_at:
                                '2022-07-26T13:26:27.602Z',
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
        @Query() pageOptionsDto: PageOptionsDto,
    ) {
        const notices =
            await this.noticesService.findAll(
                pageOptionsDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                notices: notices,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '공지 게시글 조회',
        description: ' 게시글 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    notice: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T13:26:27.602Z',
                        created_at:
                            '2022-07-26T13:26:27.602Z',
                    },
                },
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '조회 할 이벤트 게시글',
    })
    @Get(':id')
    async findOne(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const notice =
            await this.noticesService.findOne(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                notice: notice,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '공지 게시글 업데이트',
        description: '게시글 업데이트',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    updatedNotice: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T13:26:27.602Z',
                        created_at:
                            '2022-07-26T13:26:27.602Z',
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
        description: '업데이트 할 이벤트 게시글',
    })
    @Patch(':id')
    async update(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
        @Body() updateNoticeDto: UpdateNoticeDto,
    ) {
        const updatedNotice =
            await this.noticesService.update(
                id,
                updateNoticeDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                updatedNotice: updatedNotice,
            },
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 삭제',
        description: '삭제',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    deletedNotice: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T13:26:27.602Z',
                        created_at:
                            '2022-07-26T13:26:27.602Z',
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
        description: '삭제할 할 이벤트 게시글',
    })
    @Delete(':id')
    async remove(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const deletedNotice =
            await this.noticesService.remove(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                deletedNotice: deletedNotice,
            },
        };

        return response.status(200).send(result);
    }
}
