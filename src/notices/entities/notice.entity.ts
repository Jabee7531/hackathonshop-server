import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Notices')
export class Notice {
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
}
