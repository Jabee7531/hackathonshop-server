import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('EventReplies')
export class EventReply {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    author!: string;

    @Column()
    reply!: string;

    @Column({ default: false })
    is_deleted: boolean;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ManyToOne(
        () => Event,
        (event) => event.replies,
    )
    event: Event;
}
