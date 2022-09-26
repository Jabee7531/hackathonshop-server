import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/pageMeta.dto';
import { PageOptionsDto } from '../common/dto/pageOption.dto';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { UpdateNoticeDto } from './dto/update-notice.dto';
import { Notice } from './entities/notice.entity';
import { NoticeQuery } from './query/notices.query';

@Injectable()
export class NoticesService {
    constructor(
        private noticeQuery: NoticeQuery,
        @InjectRepository(Notice)
        private noticeRepository: Repository<Notice>,
    ) {}

    async create(
        createNoticeDto: CreateNoticeDto,
    ): Promise<Notice> {
        // 공지 생성
        const notice =
            await this.noticeQuery.createEventQuery(
                createNoticeDto,
            );

        return notice;
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Notice>> {
        // 모든 공지 PageNation을 통한 조회
        const notice =
            await this.noticeRepository.findAndCount(
                {
                    order: {
                        created_at:
                            pageOptionsDto.order,
                    },
                    skip:
                        (pageOptionsDto.page -
                            1) *
                        pageOptionsDto.take,
                    take: pageOptionsDto.take,
                },
            );

        // PageNation Meta 생성
        const pageMetaDto = new PageMetaDto({
            pageOptionsDto,
            itemCount: notice[1],
        });

        return new PageDto(
            notice[0],
            pageMetaDto,
        );
    }

    async findOne(id: string): Promise<Notice> {
        // 공지 조회
        const notice =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        return notice;
    }

    async update(
        id: string,
        updateNoticeDto: UpdateNoticeDto,
    ): Promise<Notice> {
        // 업데이트 할 공지 조회
        const notice =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        // 해당 공지 업데이트
        const updatedNotice =
            await this.noticeQuery.updateEventQuery(
                updateNoticeDto,
                notice,
            );

        return updatedNotice;
    }

    async remove(id: string): Promise<Notice> {
        // 삭제할 공지 조회
        const notice =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        // 해당 공지 삭제
        const deletedEvent =
            await this.noticeQuery.deleteEventQuery(
                notice,
            );

        return deletedEvent;
    }
}
