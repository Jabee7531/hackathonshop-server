import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateNoticeDto } from '../dto/create-notice.dto';
import { UpdateNoticeDto } from '../dto/update-notice.dto';
import { Notice } from '../entities/notice.entity';

@Injectable()
export class NoticeQuery {
    constructor(private dataSource: DataSource) {}

    async createEventQuery(
        createNoticeDto: CreateNoticeDto,
    ): Promise<Notice> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const notice = new Notice();

            notice.title = createNoticeDto.title;
            notice.author =
                createNoticeDto.author;
            notice.content =
                createNoticeDto.content;

            await queryRunner.manager.save(
                notice,
            );

            await queryRunner.commitTransaction();

            return notice;
        } catch (e) {
            console.log('error');
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async updateEventQuery(
        updateNoticeDto: UpdateNoticeDto,
        notice: Notice,
    ): Promise<Notice> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateNoticeDto.title) {
                notice.title =
                    updateNoticeDto.title;
            }
            if (updateNoticeDto.author) {
                notice.author =
                    updateNoticeDto.author;
            }
            if (updateNoticeDto.content) {
                notice.content =
                    updateNoticeDto.content;
            }

            const updatedEvent =
                await queryRunner.manager.save(
                    notice,
                );

            await queryRunner.commitTransaction();

            return updatedEvent;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async deleteEventQuery(
        notice: Notice,
    ): Promise<Notice> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result =
                await queryRunner.manager.remove(
                    notice,
                );

            await queryRunner.commitTransaction();

            return result;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }
}
