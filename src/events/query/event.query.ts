import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventQuery {
    constructor(private dataSource: DataSource) {}

    async createEventQuery(
        createEventDto: CreateEventDto,
    ): Promise<Event> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const event = new Event();

            event.title = createEventDto.title;
            event.author = createEventDto.author;
            event.content =
                createEventDto.content;

            await queryRunner.manager.save(event);

            await queryRunner.commitTransaction();

            return event;
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
        updateEventDto: UpdateEventDto,
        event: Event,
    ): Promise<Event> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            if (updateEventDto.title) {
                event.title =
                    updateEventDto.title;
            }
            if (updateEventDto.author) {
                event.author =
                    updateEventDto.author;
            }
            if (updateEventDto.content) {
                event.content =
                    updateEventDto.content;
            }

            const updatedEvent =
                await queryRunner.manager.save(
                    event,
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
        event: Event,
    ): Promise<Event> {
        const queryRunner =
            this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result =
                await queryRunner.manager.remove(
                    event,
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
