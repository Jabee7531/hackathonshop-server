import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { NoticeQuery } from './query/notices.query';

@Module({
    imports: [TypeOrmModule.forFeature([Notice])],
    controllers: [NoticesController],
    providers: [NoticesService, NoticeQuery],
})
export class NoticesModule {}
