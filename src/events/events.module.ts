import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventQuery } from './query/event.query';
import { EventReplyQuery } from './query/eventReply.query';
import { EventReply } from './entities/eventReply.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Event,
            EventReply,
        ]),
    ],
    controllers: [EventsController],
    providers: [
        EventsService,
        EventQuery,
        EventReplyQuery,
    ],
})
export class EventsModule {}
