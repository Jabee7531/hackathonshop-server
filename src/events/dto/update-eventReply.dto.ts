import { PartialType } from '@nestjs/swagger';
import { CreateEventReplyDto } from './create-eventReply.dto';

export class UpdateEventReplyDto extends PartialType(
    CreateEventReplyDto,
) {}
