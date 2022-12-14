import { UnauthorizedException } from '@nestjs/common';
import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GoogleAuthService } from '../lib/auth/google/getGoogleProfile';
import { SocialAccounts } from './entities/socialAccounts.entity';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;

    let mockGoogleAuthService = {
        getGoogleProfile: jest.fn(),
    };
    let mockUsersRepository = {};
    let mockDataSource = {};

    let mockSocialAccountsRepository = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule =
            await Test.createTestingModule({
                providers: [
                    UsersService,
                    {
                        provide:
                            GoogleAuthService,
                        useValue:
                            mockGoogleAuthService,
                    },
                    {
                        provide: DataSource,
                        useValue: mockDataSource,
                    },
                    {
                        provide:
                            getRepositoryToken(
                                Users,
                            ),
                        useValue:
                            mockUsersRepository,
                    },
                    {
                        provide:
                            getRepositoryToken(
                                SocialAccounts,
                            ),
                        useValue:
                            mockSocialAccountsRepository,
                    },
                ],
            }).compile();

        service =
            module.get<UsersService>(
                UsersService,
            );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('checkUser', () => {
        describe('??????', () => {
            beforeEach(async () => {
                mockGoogleAuthService.getGoogleProfile =
                    mockGoogleAuthService.getGoogleProfile.mockResolvedValue(
                        { id: 1 },
                    );
                mockSocialAccountsRepository.findOne =
                    mockSocialAccountsRepository.findOne.mockResolvedValue(
                        true,
                    );
            });
            it('????????? AccessToken', async () => {
                // Given
                const accessToken = 'accessToken';

                // When
                const result =
                    await service.checkUser(
                        accessToken,
                    );

                // Then

                expect(result).toEqual(true);
            });
        });
        describe('??????', () => {
            beforeEach(async () => {
                mockGoogleAuthService.getGoogleProfile =
                    mockGoogleAuthService.getGoogleProfile.mockRejectedValue(
                        new UnauthorizedException(
                            '401001',
                        ),
                    );
            });

            it('???????????? ?????? AccessToekn', async () => {
                const accessToken =
                    'InvalidAccessToken';

                await expect(
                    service.checkUser(
                        accessToken,
                    ),
                ).rejects.toThrow(
                    new UnauthorizedException(
                        '401001',
                    ),
                );
            });
        });
    });
});

// describe('userSignUp', () => {
//     it('??????', async () => {
//         const nickName = 'TestNickName';
//         const accessToekn = 'accessToken';
//         const provider = 'google';

//         jest.fn(
//             getGoogleProfile,
//         ).mockResolvedValue({
//             id: '106582685764823097305',
//             email: 'jabee7531@gmail.com',
//             verified_email: true,
//             name: '?????????',
//             given_name: '??????',
//             family_name: '???',
//             picture:
//                 'https://lh3.googleusercontent.com/a/AItbvmmmFHPLxeL1nEwSJY6N2xxMWqXrAaFH2aZfDYxt=s96-c',
//             locale: 'ko',
//         });

//         const userRepositoryManagerSpy = jest
//             .spyOn(
//                 userRepository.manager,
//                 'save',
//             )
//             .mockResolvedValue(new User());

//         jest.fn(
//             service.checkNickName,
//         ).mockResolvedValue(false);
//         jest.fn(
//             service.checkSocialAccountDB,
//         ).mockResolvedValue(false);
//         jest.fn(
//             service.checkUserDB,
//         ).mockResolvedValue(false);

//         expect(
//             userRepositoryManagerSpy,
//         ).toHaveBeenCalledWith(new User());
//     });
// });
