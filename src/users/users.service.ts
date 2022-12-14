import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleAuthService } from '../lib/auth/google/getGoogleProfile';
import { SocialAccounts } from './entities/socialAccounts.entity';
import { Users } from './entities/users.entity';
import { UserQuery } from './query/users.query';
import { TokenPayload } from './users.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(SocialAccounts)
        private socialAccountsRepository: Repository<SocialAccounts>,
        @InjectRepository(Users)
        private userRepository: Repository<Users>,
        private googleAuthService: GoogleAuthService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private userQuery: UserQuery,
    ) {}

    // Google 로그인시 https://www.googleapis.com/userinfo/v2/me 로 유저 정보 확인
    async checkUser(
        accessToken: string,
    ): Promise<boolean> {
        // 유저 정보 확인
        const userProfile =
            await this.googleAuthService.getGoogleProfile(
                accessToken,
            );

        // SocialAccount 등록 여부 확인
        const socialAccount =
            await this.socialAccountsRepository.findOne(
                {
                    where: {
                        social_id: userProfile.id,
                    },
                    relations: {
                        user: true,
                    },
                },
            );

        return socialAccount ? true : false;
    }

    async signInUser(
        accessToken: string,
        provider: string,
    ): Promise<{
        cookie: string;
        user: Users;
        jwt: string;
    }> {
        // 유저 정보 확인
        const userProfile =
            await this.googleAuthService.getGoogleProfile(
                accessToken,
            );

        // SocialAccount 등록 여부 확인
        const checkSocialAccount =
            await this.socialAccountsRepository.findOne(
                {
                    where: {
                        social_id: userProfile.id,
                        provider: provider,
                    },
                    relations: {
                        user: true,
                    },
                },
            );
        if (!checkSocialAccount) {
            throw new UnauthorizedException(
                '401005',
            );
        }

        // User 등록 여부 확인
        const checkUser =
            await this.userRepository.findOne({
                where: {
                    social_accounts: {
                        social_id: userProfile.id,
                    },
                },
                relations: {
                    social_accounts: true,
                },
            });
        if (!checkUser) {
            throw new UnauthorizedException(
                '401006',
            );
        }

        const { cookie, jwt } =
            this.getCookieWithJwtToken(checkUser);

        return {
            cookie: cookie,
            user: checkUser,
            jwt: jwt,
        };
    }

    async signOutUser(): Promise<string> {
        // 로그인 쿠키정보 삭제
        const cookie = this.getCookieForLogOut();

        return cookie;
    }

    async signUpUser(
        nickName: string,
        accessToken: string,
        provider: string,
    ): Promise<{
        cookie: string;
        createdUser: Users;
        jwt: string;
    }> {
        const userProfile =
            await this.googleAuthService.getGoogleProfile(
                accessToken,
            );

        // 닉네임 중복 체크
        const checkNickName =
            await this.userRepository.findOne({
                where: {
                    nick_name: nickName,
                },
                relations: {
                    social_accounts: true,
                },
            });
        if (checkNickName) {
            throw new BadRequestException(
                '400003',
            );
        }

        // SocialAccount 등록 여부 확인
        const checkSocialAccount =
            await this.socialAccountsRepository.findOne(
                {
                    where: {
                        social_id: userProfile.id,
                        provider: provider,
                    },
                    relations: {
                        user: true,
                    },
                },
            );
        if (checkSocialAccount) {
            throw new UnauthorizedException(
                '401002',
            );
        }

        // User 등록 여부 확인
        const checkUser =
            await this.userRepository.findOne({
                where: {
                    social_accounts: {
                        social_id: userProfile.id,
                    },
                },
                relations: {
                    social_accounts: true,
                },
            });
        if (checkUser) {
            throw new UnauthorizedException(
                '401004',
            );
        }

        // User 생성
        const createdUser =
            await this.userQuery.createUserQuery(
                nickName,
                userProfile,
            );

        const { cookie, jwt } =
            this.getCookieWithJwtToken(
                createdUser,
            );

        return {
            cookie: cookie,
            createdUser: createdUser,
            jwt: jwt,
        };
    }

    async reSignUser(id: string): Promise<{
        cookie: string;
        deletedUser: Users;
    }> {
        // User 확인
        const user =
            await this.userRepository.findOne({
                where: {
                    id: id,
                },
            });

        // User 삭제
        const deletedUser =
            await this.userQuery.deleteUserQuery(
                user,
            );

        const cookie = this.getCookieForLogOut();

        return {
            cookie: cookie,
            deletedUser: deletedUser,
        };
    }

    // JWT 쿠키 생성
    private getCookieWithJwtToken(user: Users) {
        const payload: TokenPayload = { user };

        // JWT 생성
        const token =
            this.jwtService.sign(payload);

        return {
            cookie: `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
                'JWT_EXPIRATION_TIME',
            )}`,
            jwt: token,
        };
    }

    // JWT 쿠키 삭제
    private getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    }
}
