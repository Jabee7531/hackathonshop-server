import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEventReplyDto } from '../dto/create-eventReply.dto';
import { UpdateEventReplyDto } from '../dto/update-eventReply.dto';
import { Event } from '../entities/event.entity';
import { EventReply } from '../entities/eventReply.entity';

@Injectable()
export class EventReplyQuery {
    constructor(private dataSource: DataSource) {}

    async createEventReplyQuery(
        createEventReplyDto: CreateEventReplyDto,
        event: Event,
    ): Promise<EventReply> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const eventReply = new EventReply();

            eventReply.author =
                createEventReplyDto.author;
            eventReply.reply =
                createEventReplyDto.reply;
            eventReply.event = event;

            await queryRunner.manager.save(
                eventReply,
            );

            await queryRunner.commitTransaction();

            return eventReply;
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

    async updateEventReplyQuery(
        updateEventReplyDto: UpdateEventReplyDto,
        eventReply: EventReply,
    ): Promise<EventReply> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateEventReplyDto.author) {
                eventReply.author =
                    updateEventReplyDto.author;
            }
            if (updateEventReplyDto.reply) {
                eventReply.reply =
                    updateEventReplyDto.reply;
            }

            const updatedEventReply =
                await queryRunner.manager.save(
                    eventReply,
                );

            await queryRunner.commitTransaction();

            return updatedEventReply;
        } catch (e) {
            await queryRunner.rollbackTransaction();

            throw new BadRequestException(
                '400001',
            );
        } finally {
            await queryRunner.release();
        }
    }

    async deleteEventReplyQuery(
        eventReply: EventReply,
    ): Promise<EventReply> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result =
                await queryRunner.manager.remove(
                    eventReply,
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
