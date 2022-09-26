import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { CheckUserDto } from './dto/check-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { SignUpUserDto } from './dto/sign-up-user.dto';
import { RequestWithUser } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}
    @ApiOperation({
        summary: '유저 가입여부 확인',
        description: '유저 가입여부 확인',
    })
    @ApiResponse({
        status: 200000,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    exist: true,
                },
            },
        },
    })
    @ApiResponse({
        status: 401001,
        description: '유효하지 않은 AcessToken',
        schema: {
            example: {
                statusCode: 401,
                message: '401001',
                error: 'Unauthorized',
            },
        },
    })
    @ApiResponse({
        status: 401002,
        description: 'SocialAccount가 이미 존재',
        schema: {
            example: {
                statusCode: 401,
                message: '401002',
                error: 'Unauthorized',
            },
        },
    })
    @ApiBody({ type: CheckUserDto })
    @Post('check')
    async checkUser(
        @Req() request: Request,
        @Res() response: Response,
        @Body() dto: CheckUserDto,
    ) {
        const { accessToken } = dto;

        const exist =
            await this.usersService.checkUser(
                accessToken,
            );

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                exist: exist,
            },
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '유저 로그인',
        description: '유저 로그인',
    })
    @ApiResponse({
        status: 200000,
        description: '성공!',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {
                    user: {
                        id: 'string',
                        email: 'string',
                        username: 'string',
                        nick_name: 'string',
                        photo_url: 'string',
                        created_at:
                            '2022-07-14T18:48:46.191Z',
                        is_certified: true,
                        social_accounts: [
                            {
                                id: 'string',
                                provider:
                                    'string',
                                social_id:
                                    'string',
                                created_at:
                                    '2022-07-14T18:48:46.191Z',
                                user: 'string',
                            },
                        ],
                    },
                    jwt: 'JWT_Token',
                },
            },
        },
    })
    @ApiResponse({
        status: 401001,
        description: '유효하지않은 AccessToken',
        schema: {
            example: {
                statusCode: 401,
                message: '401001',
                error: 'Unauthorized',
            },
        },
    })
    @ApiResponse({
        status: 401005,
        description:
            'SocialAccount가 존재하지 않음',
        schema: {
            example: {
                statusCode: 401,
                message: '401005',
                error: 'Unauthorized',
            },
        },
    })
    @ApiResponse({
        status: 401006,
        description: 'User가 존재하지 않음',
        schema: {
            example: {
                statusCode: 401,
                message: '401006',
                error: 'Unauthorized',
            },
        },
    })
    @ApiBody({ type: SignInUserDto })
    @Post('signin')
    async signInUser(
        @Req() request: Request,
        @Res() response: Response,
        @Body() dto: SignInUserDto,
    ) {
        const { accessToken } = dto;

        const { cookie, user, jwt } =
            await this.usersService.signInUser(
                accessToken,
                'google',
            );

        response.setHeader('Set-Cookie', cookie);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {
                user: user,
                jwt: jwt,
            },
        };
        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '유저 로그아웃',
        description: '유저 로그아웃',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: 200,
                message: '200000',
                result: {},
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'JWT Guard 실패',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized',
            },
        },
    })
    @UseGuards(JwtAuthGuard)
    @Post('signout')
    async logOut(
        @Req() request: RequestWithUser,
        @Res() response: Response,
    ) {
        const cookie =
            await this.usersService.signOutUser();

        response.setHeader('Set-Cookie', cookie);

        const result = {
            statusCode: 200,
            message: '200000',
            result: {},
        };

        return response.status(200).send(result);
    }

    @ApiOperation({
        summary: '유저 회원가입',
        description: '유저 회원가입',
    })
    @ApiResponse({
        status: 201000,
        description: '성공!',
        schema: {
            example: {
                statusCode: 201,
                message: '201000',
                result: {
                    user: {
                        id: 'string',
                        email: 'string',
                        username: 'string',
                        nick_name: 'string',
                        photo_url: 'string',
                        created_at:
                            '2022-07-14T18:48:46.191Z',
                        is_certified: true,
                        social_accounts: [
                            {
                                id: 'string',
                                provider:
                                    'string',
                                social_id:
                                    'string',
                                created_at:
                                    '2022-07-14T18:48:46.191Z',
                                user: 'string',
                            },
                        ],
                    },
                    jwt: 'JWT_Token',
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
    @ApiResponse({
        status: 401001,
        description:
            'AccessToken가 존제하지 않음',
        schema: {
            example: {
                statusCode: 401,
                message: '401001',
                error: 'Unauthorized',
            },
        },
    })
    @ApiResponse({
        status: 401002,
        description: 'SocialAccount가 이미 존재',
        schema: {
            example: {
                statusCode: 401,
                message: '401002',
                error: 'Unauthorized',
            },
        },
    })
    @ApiResponse({
        status: 400003,
        description: 'NickName 중복',
        schema: {
            example: {
                statusCode: 400,
                message: '400003',
                error: 'Bad Request',
            },
        },
    })
    @ApiResponse({
        status: 401004,
        description: 'User가 이미 존재',
        schema: {
            example: {
                statusCode: 401,
                message: '401004',
                error: 'Unauthorized',
            },
        },
    })
    @ApiBody({ type: SignUpUserDto })
    @Post('signup')
    async signUpUser(
        @Req() request: Request,
        @Res() response: Response,
        @Body() dto: SignUpUserDto,
    ) {
        const {
            nickName,
            accessToken,
            provider,
        } = dto;

        const { cookie, createdUser, jwt } =
            await this.usersService.signUpUser(
                nickName,
                accessToken,
                provider,
            );

        response.setHeader('Set-Cookie', cookie);

        const result = {
            statusCode: 201,
            message: '201000',
            result: {
                user: createdUser,
                jwt: jwt,
            },
        };

        return response.status(201).send(result);
    }

    @ApiOperation({
        summary: '유저 삭제',
        description: '유저 삭제',
    })
    @ApiResponse({
        status: 200,
        description: '성공',
        schema: {
            example: {
                statusCode: '200',
                message: '200000',
                result: {
                    deletedUser: {
                        id: 'string',
                        email: 'string',
                        username: 'string',
                        nick_name: 'string',
                        photo_url: 'string',
                        created_at:
                            '2022-07-14T18:48:46.191Z',
                        is_certified: true,
                        social_accounts: [
                            {
                                id: 'string',
                                provider:
                                    'string',
                                social_id:
                                    'string',
                                created_at:
                                    '2022-07-14T18:48:46.191Z',
                                user: 'string',
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
    @ApiResponse({
        status: 401,
        description: 'JWT Guard 실패',
        schema: {
            example: {
                statusCode: 401,
                message: 'Unauthorized',
            },
        },
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: '삭제 할 유저',
    })
    @UseGuards(JwtAuthGuard)
    @Delete('resign/:id')
    async reSignUser(
        @Req() request: RequestWithUser,
        @Res() response: Response,
        @Param('id') id: string,
    ) {
        const { cookie, deletedUser } =
            await this.usersService.reSignUser(
                id,
            );

        response.setHeader('Set-Cookie', cookie);

        const result = {
            statusCode: 200,
            message: '200000',
            result: { deletedUser: deletedUser },
        };

        return response.status(200).send(result);
    }
}
