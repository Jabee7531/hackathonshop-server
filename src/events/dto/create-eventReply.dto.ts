import { IsUUID } from 'class-validator';

export class CreateEventReplyDto {
    readonly author: string;
    readonly reply: string;
    @IsUUID('4')
    readonly eventId: string;
}
