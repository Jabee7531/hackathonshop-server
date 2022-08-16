import {
    Test,
    TestingModule,
} from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmTestAsyncConfig } from '../src/config/orm.test.config';
import { Products } from '../src/shop/entities/shop.entity';
import { Repository } from 'typeorm';
import { Notice } from '../src/notices/entities/notice.entity';
import { Event } from '../src/events/entities/event.entity';
import { EventReply } from '../src/events/entities/eventReply.entity';

describe('AppController (e2e)', () => {
    let app: INestApplication;
    const repoList = [
        'UsersRepository',
        'SocialAccountsRepository',
        'ProductsRepository',
        'NoticeRepository',
        'EventRepository',
        'EventReplyRepository',
    ];
    let productRepo: Repository<Products>;
    let noticeRepo: Repository<Notice>;
    let eventRepo: Repository<Event>;
    let eventReplyRepo: Repository<EventReply>;
    let product: Products;
    let notice: Notice;
    let event: Event;
    let eventReply: EventReply;

    const accessToken =
        'ya29.A0AVA9y1sbAwTcknDa5_St_UMkJHpCSsW47VFZwIA7Rr6dcP9DOLZj_FTlp7kgeo9szX-9pN6Nv4WYpu4tHjuKBqpw3U0upmOirWGh01-frO2gYTuM2FuH2Jw2HL6NKAJZZbfPBZ0SK1R_8nWriV6jf0CglNDrNFUaCgYKATASATASFQE65dr85iSvWamK_xXCrNS2ssh_Gg0166';

    beforeAll(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [
                    TypeOrmModule.forRootAsync(
                        typeOrmTestAsyncConfig,
                    ),
                    AppModule,
                ],
            }).compile();

        app =
            moduleFixture.createNestApplication();

        for (const repo of repoList) {
            let repository =
                moduleFixture.get(repo);
            const connection =
                repository.manager.connection;
            await connection.synchronize(true);
        }
        productRepo = moduleFixture.get(
            'ProductsRepository',
        );
        noticeRepo = moduleFixture.get(
            'NoticeRepository',
        );
        eventRepo = moduleFixture.get(
            'EventRepository',
        );
        eventReplyRepo = moduleFixture.get(
            'EventReplyRepository',
        );

        await app.init();
    });
    beforeEach(async () => {});

    // it('/ (GET)', () => {
    //     return request(app.getHttpServer())
    //         .get('/')
    //         .expect(200)
    //         .expect('Hello World!');
    // });
    describe('user', () => {
        describe('checkUser', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/check')
                    .send({
                        accessToken: accessToken,
                    })
                    .expect(200);
            });
            it('checkUser 유효하지 않은 AcessToken', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/check')
                    .send({
                        accessToken:
                            'InvalidAccessToken',
                    })
                    .expect(401)
                    .expect({
                        statusCode: 401,
                        message: '401001',
                        error: 'Unauthorized',
                    });
            });
        });

        describe('SignUpUser', () => {
            it('SignUpUser 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signup')
                    .send({
                        nickName: 'TestNickName',
                        accessToken: accessToken,
                        provider: 'google',
                    })
                    .expect(201);
            });
            it('NickName 중복', async () => {
                await request(app.getHttpServer())
                    .post('/users/signup')
                    .send({
                        nickName: 'TestNickName',
                        accessToken: accessToken,
                        provider: 'google',
                    });
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signup')
                    .send({
                        nickName: 'TestNickName',
                        accessToken: accessToken,
                        provider: 'google',
                    })
                    .expect(400)
                    .expect({
                        statusCode: 400,
                        message: '400003',
                        error: 'Bad Request',
                    });
            });
            it('SocialAccount가 이미 존재', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signup')
                    .send({
                        nickName: 'TTestNickName',
                        accessToken: accessToken,
                        provider: 'google',
                    })
                    .expect(401)
                    .expect({
                        statusCode: 401,
                        message: '401002',
                        error: 'Unauthorized',
                    });
            });
            it('유효하지 않은 AccessToken', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signup')
                    .send({
                        nickName: 'TestNickName',
                        accessToken:
                            'InvalidAccessToken',
                        provider: 'google',
                    })
                    .expect({
                        statusCode: 401,
                        message: '401001',
                        error: 'Unauthorized',
                    });
            });
        });

        describe('SignInUser', () => {
            it('SignIn Success', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signin')
                    .send({
                        accessToken: accessToken,
                    })
                    .expect(200);
            });
            it('not validate checkUser', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/users/signin')
                    .send({
                        accessToken:
                            'InvalidAccessToken',
                    })
                    .expect(401)
                    .expect({
                        statusCode: 401,
                        message: '401001',
                        error: 'Unauthorized',
                    });
            });
        });
    });

    describe('shop', () => {
        describe('물품 추가', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/shop')
                    .send({
                        name: 'string',
                        category: ['string'],
                        price: '20000',
                        size: ['string'],
                        color: ['string'],
                        brand: 'string',
                        thumbnail: 'string',
                        photos: ['string'],
                    })
                    .expect(201);
            });
            it('bad payload', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/shop')
                    .send({})
                    .expect({
                        statusCode: 400,
                        message: '400001',
                        error: 'Bad Request',
                    });
            });
        });
        describe('물품 전체 조회', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get('/shop')
                    .send()
                    .expect(200);
            });
        });
        describe('물품 하나 조회', () => {
            it('성공', async () => {
                product =
                    await productRepo.findOne({
                        where: {},
                    });

                return await request(
                    app.getHttpServer(),
                )
                    .get(`/shop/${product.id}`)
                    .send()
                    .expect(200);
            });
        });
        describe('물품 쿼리 조회', () => {
            it('category 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/shop/query?category[0]=${product.category}`,
                    )
                    .send()
                    .expect(200);
            });
            it('price 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(`/shop/query`)
                    .query({
                        minPrice: '10000',
                        maxPrice: '30000',
                    })
                    .send()
                    .expect(200);
            });
            it('size 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/shop/query?size[0]=${product.size}`,
                    )
                    .query({
                        size: product.size,
                    })
                    .send()
                    .expect(200);
            });
            it('color 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/shop/query?color[0]=${product.color}`,
                    )
                    .query({
                        color: product.color,
                    })
                    .send()
                    .expect(200);
            });
            it('brand 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/shop/query?brand[0]=${product.brand}`,
                    )
                    .query({
                        brand: product.brand,
                    })
                    .send()
                    .expect(200);
            });
        });
        describe('물품 업데이트', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send()
                    .expect(200);
            });
            it('name 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({ name: 'udpated' })
                    .expect(200);
            });
            it('category 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        category: ['udpated'],
                    })
                    .expect(200);
            });
            it('price 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        price: '10000',
                    })
                    .expect(200);
            });
            it('size 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        size: ['udpated'],
                    })
                    .expect(200);
            });
            it('color 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        color: ['udpated'],
                    })
                    .expect(200);
            });
            it('brand 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        brand: 'udpated',
                    })
                    .expect(200);
            });
            it('thumbnail 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        thumbnail: 'udpated',
                    })
                    .expect(200);
            });
            it('photos 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/shop/${product.id}`)
                    .send({
                        photos: ['udpated'],
                    })
                    .expect(200);
            });
        });
        describe('물품 삭제', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .delete(`/shop/${product.id}`)
                    .send()
                    .expect(200);
            });
        });
    });

    describe('events', () => {
        describe('이벤트 게시글 추가', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/events')
                    .send({
                        title: 'string',
                        author: 'string',
                        content: 'string',
                    })
                    .expect(201);
            });
            it('bad payload', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/events')
                    .send({})
                    .expect({
                        statusCode: 400,
                        message: '400001',
                        error: 'Bad Request',
                    });
            });
        });
        describe('이벤트 게시글 전체 조회', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/events?order=ASC&page=1&take=10`,
                    )
                    .send()
                    .expect(200);
            });
        });
        describe('이벤트 게시글 하나 조회', () => {
            it('성공', async () => {
                event = await eventRepo.findOne({
                    where: {},
                });

                return await request(
                    app.getHttpServer(),
                )
                    .get(`/events/${event.id}`)
                    .send()
                    .expect(200);
            });
        });

        describe('이벤트 게시글 업데이트', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/events/${event.id}`)
                    .send()
                    .expect(200);
            });
            it('title 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/events/${event.id}`)
                    .send({
                        title: 'udpated',
                    })
                    .expect(200);
            });
            it('author 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/events/${event.id}`)
                    .send({
                        author: 'udpated',
                    })
                    .expect(200);
            });
            it('content 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(`/events/${event.id}`)
                    .send({
                        content: 'udpated',
                    })
                    .expect(200);
            });
        });
        describe('이벤트 게시글 삭제', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .delete(`/events/${event.id}`)
                    .send()
                    .expect(200);
            });
        });
    });

    describe('eventsReply', () => {
        describe('이벤트 게시글 댓글 추가', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/events/reply')
                    .send({
                        author: 'string',
                        reply: 'string',
                        eventId: event.id,
                    })
                    .expect(201);
            });
            it('bad payload', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/events/reply')
                    .send({})
                    .expect({
                        statusCode: 400,
                        message: '400001',
                        error: 'Bad Request',
                    });
            });
        });
        describe('이벤트 게시글 댓글 전체 조회', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(`/events/reply`)
                    .send()
                    .expect(200);
            });
        });
        describe('이벤트 게시글 댓글 하나 조회', () => {
            it('성공', async () => {
                eventReply =
                    await eventReplyRepo.findOne({
                        where: {},
                    });

                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send()
                    .expect(200);
            });
        });

        describe('이벤트 게시글 댓글 업데이트', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send()
                    .expect(200);
            });
            it('author 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send({
                        author: 'udpated',
                    })
                    .expect(200);
            });
            it('reply 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send({
                        reply: 'udpated',
                    })
                    .expect(200);
            });
            it('eventId 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send({
                        eventId: event.id + '1',
                    })
                    .expect(200);
            });
        });
        describe('이벤트 게시글 댓글 삭제', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .delete(
                        `/events/reply/${eventReply.id}`,
                    )
                    .send()
                    .expect(200);
            });
        });
    });

    describe('notices', () => {
        describe('공지 게시글 추가', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/notices')
                    .send({
                        title: 'string',
                        author: 'string',
                        content: 'string',
                    })
                    .expect(201);
            });
            it('bad payload', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .post('/notices')
                    .send({})
                    .expect({
                        statusCode: 400,
                        message: '400001',
                        error: 'Bad Request',
                    });
            });
        });
        describe('공지 게시글 전체 조회', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .get(
                        `/notices?order=ASC&page=1&take=10`,
                    )
                    .send()
                    .expect(200);
            });
        });
        describe('공지 게시글 하나 조회', () => {
            it('성공', async () => {
                notice = await noticeRepo.findOne(
                    {
                        where: {},
                    },
                );

                return await request(
                    app.getHttpServer(),
                )
                    .get(`/notices/${notice.id}`)
                    .send()
                    .expect(200);
            });
        });

        describe('공지 게시글 업데이트', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/notices/${notice.id}`,
                    )
                    .send()
                    .expect(200);
            });
            it('title 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/notices/${notice.id}`,
                    )
                    .send({
                        title: 'udpated',
                    })
                    .expect(200);
            });
            it('author 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/notices/${notice.id}`,
                    )
                    .send({
                        author: 'udpated',
                    })
                    .expect(200);
            });
            it('content 업데이트 성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .patch(
                        `/notices/${notice.id}`,
                    )
                    .send({
                        content: 'udpated',
                    })
                    .expect(200);
            });
        });
        describe('공지 게시글 삭제', () => {
            it('성공', async () => {
                return await request(
                    app.getHttpServer(),
                )
                    .delete(
                        `/notices/${notice.id}`,
                    )
                    .send()
                    .expect(200);
            });
        });
    });

    afterEach(() => {});
    afterAll(() => {
        app.close();
    });
});
