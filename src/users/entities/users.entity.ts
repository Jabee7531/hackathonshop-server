import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialAccounts } from './socialAccounts.entity';

@Entity('Users')
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Index()
    @Column({ unique: true })
    email!: string;

    @Index()
    @Column({ length: 16, nullable: true })
    username?: string;

    @Column({ length: 48, unique: true })
    nick_name!: string;

    @Column({ length: 255, nullable: true })
    photo_url?: string;

    @Index()
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @Index()
    @Column()
    is_certified!: boolean;

    @OneToMany(
        () => SocialAccounts,
        (social_accounts) => social_accounts.user,
    )
    social_accounts: SocialAccounts[];
}
