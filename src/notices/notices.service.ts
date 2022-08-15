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
        const notice =
            await this.noticeQuery.createEventQuery(
                createNoticeDto,
            );

        return notice;
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Notice>> {
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
        const event =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        return event;
    }

    async update(
        id: string,
        updateNoticeDto: UpdateNoticeDto,
    ): Promise<Notice> {
        const notice =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        const updatedNotice =
            await this.noticeQuery.updateEventQuery(
                updateNoticeDto,
                notice,
            );

        return updatedNotice;
    }

    async remove(id: string): Promise<Notice> {
        const notice =
            await this.noticeRepository.findOne({
                where: {
                    id: id,
                },
            });

        const deletedEvent =
            await this.noticeQuery.deleteEventQuery(
                notice,
            );

        return deletedEvent;
    }
}
