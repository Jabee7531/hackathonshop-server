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
        // 이벤트 게시글 생성
        const event =
            await this.eventQuery.createEventQuery(
                createEventDto,
            );

        return event;
    }

    async findAll(
        pageOptionsDto: PageOptionsDto,
    ): Promise<PageDto<Event>> {
        // 모든 이벤트 게시글 PageNation을 통한 조회
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

        // PageNation Meta 생성
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
        // 이벤트 게시글 조회
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
        // 업데이트 할 이벤트 게시글 조회
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: id,
                },
            });

        // 해당 이벤트 게시글 업데이트
        const updatedEvent =
            await this.eventQuery.updateEventQuery(
                updateEventDto,
                event,
            );

        return updatedEvent;
    }

    async remove(id: string): Promise<Event> {
        // 삭제할 이벤트 게시글 조회
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: id,
                },
            });

        // 해당 이벤트 게시글 삭제
        const deletedEvent =
            await this.eventQuery.deleteEventQuery(
                event,
            );

        return deletedEvent;
    }

    async createReply(
        createEventReplyDto: CreateEventReplyDto,
    ): Promise<EventReply> {
        // 댓글을 추가할 이벤트 게시글 조회
        const event =
            await this.eventRepository.findOne({
                where: {
                    id: createEventReplyDto.eventId,
                },
            });

        // 이벤트 게시글 댓글 생성
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
        // 모든 이벤트 게시글 댓글 조회
        const eventReplies =
            await this.eventReplyRepository.find(
                {},
            );

        return eventReplies;
    }

    async findOneReply(
        id: string,
    ): Promise<EventReply> {
        // 이벤트 게시글 댓글 조회
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
        // 업데이트 할 이벤트 게시글 댓글 조회
        const eventReply =
            await this.eventReplyRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        // 해당 이벤트 게시글 댓글 업데이트
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
        // 삭제할 이벤트 게시글 댓글 조회
        const eventReply =
            await this.eventReplyRepository.findOne(
                {
                    where: {
                        id: id,
                    },
                },
            );

        // 해당 이벤트 게시글 댓글 삭제
        const deletedEventReply =
            await this.eventReplyQuery.deleteEventReplyQuery(
                eventReply,
            );

        return deletedEventReply;
    }
}
