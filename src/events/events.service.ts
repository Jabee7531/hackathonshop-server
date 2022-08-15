import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto } from '../common/dto/page.dto';
import { PageMetaDto } from '../common/dto/pageMeta.dto';
import { PageOptionsDto } from '../common/dto/pageOption.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateEventReplyDto } from './dto/create-eventReply.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventReplyDto } from './dto/update-eventReply.dto';
import { Event } from './entities/event.entity';
import { EventReply } from './entities/eventReply.entity';
import { EventQuery } from './query/event.query';
import { EventReplyQuery } from './query/eventReply.query';

@Injectable()
export class EventsService {
    constructor(
        private eventQuery: EventQuery,
        private eventReplyQuery: EventReplyQuery,
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
        @InjectRepository(EventReply)
        private eventReplyRepository: Repository<EventReply>,
    ) {}

    async create(
        createEventDto: CreateEventDto,
    ): Promise<Event> {
        const event =
            await this.eventQuery.createEventQuery(
                createEventDto,
            );

        return event;
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Event>> {
        const events =
            await this.eventRepository.findAndCount(
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
            itemCount: events[1],
        });

        return new PageDto(
            events[0],
            pageMetaDto,
        );
    }

    async findOne(id: string): Promise<Event> {
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: id,
                },
                relations: { replies: true },
            });
        return event;
    }

    async update(
        id: string,
        updateEventDto: UpdateEventDto,
    ): Promise<Event> {
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: id,
                },
            });

        const updatedEvent =
            await this.eventQuery.updateEventQuery(
                updateEventDto,
                event,
            );

        return updatedEvent;
    }

    async remove(id: string): Promise<Event> {
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: id,
                },
            });

        const deletedEvent =
            await this.eventQuery.deleteEventQuery(
                event,
            );

        return deletedEvent;
    }

    async createReply(
        createEventReplyDto: CreateEventReplyDto,
    ): Promise<EventReply> {
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: createEventReplyDto.eventId,
                },
            });

        const eventReply =
            await this.eventReplyQuery.createEventReplyQuery(
                createEventReplyDto,
                event,
            );

        return eventReply;
    }

    async findAllReplies(): Promise<
        EventReply[]
    > {
        const eventReplies =
            await this.eventReplyRepository.find(
                {},
            );

        return eventReplies;
    }

    async findOneReply(
        id: string,
    ): Promise<EventReply> {
        const eventReply =
            await this.eventReplyRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );
        return eventReply;
    }

    async updateReply(
        id: string,
        updateEventReplyDto: UpdateEventReplyDto,
    ): Promise<EventReply> {
        const eventReply =
            await this.eventReplyRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        const updatedEventReply =
            await this.eventReplyQuery.updateEventReplyQuery(
                updateEventReplyDto,
                eventReply,
            );

        return updatedEventReply;
    }

    async removeReply(
        id: string,
    ): Promise<EventReply> {
        const eventReply =
            await this.eventReplyRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        const deletedEventReply =
            await this.eventReplyQuery.deleteEventReplyQuery(
                eventReply,
            );

        return deletedEventReply;
    }
}
