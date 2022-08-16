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
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateEventReplyDto } from './dto/create-eventReply.dto';
import { UpdateEventReplyDto } from './dto/update-eventReply.dto';
import { PageOptionsDto } from '../common/dto/pageOption.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
    ) {}

    @ApiOperation({
        summary: '이벤트 게시글 댓글 추가',
        description: '이벤트 게시글 댓글 추가',
    })
    @ApiResponse({
        status: 201,
        description: '성공!',
        schema: {
            example: {
                statusCode: 201,
                message: '201000',
                result: {
                    eventReply: {
                        id: 'string',
                        author: 'string',
                        reply: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:25:16.269Z',
                        created_at:
                            '2022-07-26T15:25:16.269Z',
                        event: {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:25:16.269Z',
                            created_at:
                                '2022-07-26T15:25:16.269Z',
                            replies: ['string'],
                        },
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
    @ApiBody({ type: CreateEventReplyDto })
    @Post('/reply')
    async createReply(
        @Req() request: Request,
        @Res() response: Response,
        @Body()
        createReplyEventDto: CreateEventReplyDto,
    ) {
        const eventReply =
            await this.eventsService.createReply(
                createReplyEventDto,
            );

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                eventReply: eventReply,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 추가',
        description: '이벤트 게시글 추가',
    })
    @ApiResponse({
        status: 201,
        description: '성공!',
        schema: {
            example: {
                statusCode: 201,
                message: '201000',
                result: {
                    event: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:28:41.582Z',
                        created_at:
                            '2022-07-26T15:28:41.582Z',
                        replies: [
                            {
                                id: 'string',
                                author: 'string',
                                reply: 'string',
                                is_deleted: true,
                                updated_at:
                                    '2022-07-26T15:28:41.582Z',
                                created_at:
                                    '2022-07-26T15:28:41.582Z',
                                event: 'string',
                            },
                        ],
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
    @ApiBody({ type: CreateEventDto })
    @Post()
    async create(
        @Req() request: Request,
        @Res() response: Response,
        @Body() createEventDto: CreateEventDto,
    ) {
        const event =
            await this.eventsService.create(
                createEventDto,
            );

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                event: event,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 댓글 전체 조회',
        description:
            '이벤트 게시글 댓글 전체 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    eventReply: [
                        {
                            id: 'string',
                            author: 'string',
                            reply: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:25:16.269Z',
                            created_at:
                                '2022-07-26T15:25:16.269Z',
                            event: {
                                id: 'string',
                                index: 0,
                                title: 'string',
                                author: 'string',
                                content: 'string',
                                is_deleted: true,
                                updated_at:
                                    '2022-07-26T15:25:16.269Z',
                                created_at:
                                    '2022-07-26T15:25:16.269Z',
                                replies: [
                                    'string',
                                ],
                            },
                        },
                    ],
                },
            },
        },
    })
    @Get('/reply')
    async findAllReply(
        @Req() request: Request,
        @Res() response: Response,
    ) {
        const eventReplies =
            await this.eventsService.findAllReplies();

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                eventReply: eventReplies,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 댓글 조회',
        description: '이벤트 게시글 댓글 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    eventReply: {
                        id: 'string',
                        author: 'string',
                        reply: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:25:16.269Z',
                        created_at:
                            '2022-07-26T15:25:16.269Z',
                        event: {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:25:16.269Z',
                            created_at:
                                '2022-07-26T15:25:16.269Z',
                            replies: ['string'],
                        },
                    },
                },
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '조회 할 이벤트 게시글 댓글',
    })
    @Get('/reply/:id')
    async findOneReply(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const eventReply =
            await this.eventsService.findOneReply(
                id,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                eventReply: eventReply,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 전체 조회',
        description: '이벤트 게시글 전체 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    events: [
                        {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:28:41.582Z',
                            created_at:
                                '2022-07-26T15:28:41.582Z',
                            replies: [
                                {
                                    id: 'string',
                                    author: 'string',
                                    reply: 'string',
                                    is_deleted:
                                        true,
                                    updated_at:
                                        '2022-07-26T15:28:41.582Z',
                                    created_at:
                                        '2022-07-26T15:28:41.582Z',
                                    event: 'string',
                                },
                            ],
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
        const events =
            await this.eventsService.findAll(
                pageOptionsDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                events: events,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 조회',
        description: '이벤트 게시글 조회',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    event: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:28:41.582Z',
                        created_at:
                            '2022-07-26T15:28:41.582Z',
                        replies: [
                            {
                                id: 'string',
                                author: 'string',
                                reply: 'string',
                                is_deleted: true,
                                updated_at:
                                    '2022-07-26T15:28:41.582Z',
                                created_at:
                                    '2022-07-26T15:28:41.582Z',
                                event: 'string',
                            },
                        ],
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
        const event =
            await this.eventsService.findOne(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                event: event,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 댓글 업데이트',
        description:
            '이벤트 게시글 댓글 업데이트',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    updatedEeventReply: {
                        id: 'string',
                        author: 'string',
                        reply: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:25:16.269Z',
                        created_at:
                            '2022-07-26T15:25:16.269Z',
                        event: {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:25:16.269Z',
                            created_at:
                                '2022-07-26T15:25:16.269Z',
                            replies: ['string'],
                        },
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
        description:
            '업데이트 할 이벤트 게시글 댓글',
    })
    @ApiBody({ type: UpdateEventReplyDto })
    @Patch('/reply/:id')
    async updateReply(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
        @Body()
        updateEventReplyDto: UpdateEventReplyDto,
    ) {
        const updatedEeventReply =
            await this.eventsService.updateReply(
                id,
                updateEventReplyDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                updatedEeventReply:
                    updatedEeventReply,
            },
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 업데이트',
        description: '이벤트 게시글 업데이트',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    updatedEvent: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:28:41.582Z',
                        created_at:
                            '2022-07-26T15:28:41.582Z',
                        replies: [
                            {
                                id: 'string',
                                author: 'string',
                                reply: 'string',
                                is_deleted: true,
                                updated_at:
                                    '2022-07-26T15:28:41.582Z',
                                created_at:
                                    '2022-07-26T15:28:41.582Z',
                                event: 'string',
                            },
                        ],
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
    @ApiBody({ type: UpdateEventDto })
    @Patch(':id')
    async update(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
    ) {
        const updatedEvent =
            await this.eventsService.update(
                id,
                updateEventDto,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                updatedEvent: updatedEvent,
            },
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '이벤트 게시글 댓글 삭제',
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
                    deletedEventReply: {
                        id: 'string',
                        author: 'string',
                        reply: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:25:16.269Z',
                        created_at:
                            '2022-07-26T15:25:16.269Z',
                        event: {
                            id: 'string',
                            index: 0,
                            title: 'string',
                            author: 'string',
                            content: 'string',
                            is_deleted: true,
                            updated_at:
                                '2022-07-26T15:25:16.269Z',
                            created_at:
                                '2022-07-26T15:25:16.269Z',
                            replies: ['string'],
                        },
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
        description:
            '삭제할 할 이벤트 게시글 댓글',
    })
    @Delete('/reply/:id')
    async removeReply(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const deletedEventReply =
            await this.eventsService.removeReply(
                id,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                deletedEventReply:
                    deletedEventReply,
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
                    deletedEvent: {
                        id: 'string',
                        index: 0,
                        title: 'string',
                        author: 'string',
                        content: 'string',
                        is_deleted: true,
                        updated_at:
                            '2022-07-26T15:28:41.582Z',
                        created_at:
                            '2022-07-26T15:28:41.582Z',
                        replies: [
                            {
                                id: 'string',
                                author: 'string',
                                reply: 'string',
                                is_deleted: true,
                                updated_at:
                                    '2022-07-26T15:28:41.582Z',
                                created_at:
                                    '2022-07-26T15:28:41.582Z',
                                event: 'string',
                            },
                        ],
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
        const deletedEvent =
            await this.eventsService.remove(id);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                deletedEvent: deletedEvent,
            },
        };

        return response.status(200).send(result);
    }
}
