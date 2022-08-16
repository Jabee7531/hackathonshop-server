import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity('SocialAccounts')
export class SocialAccounts {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    provider!: string;

    @Index()
    @Column()
    social_id!: string;

    @Index()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @ManyToOne(
        () => Users,
        (user) => user.social_accounts,
        { onDelete: 'CASCADE' },
    )
    user: Users;
}
