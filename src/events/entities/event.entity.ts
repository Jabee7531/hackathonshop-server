import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { EventReply } from './eventReply.entity';

@Entity('Events')
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    @Generated()
    index: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column()
    content: string;

    @Column({ default: false })
    is_deleted: boolean;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @OneToMany(
        () => EventReply,
        (replies) => replies.event,
    )
    replies: EventReply[];
}
