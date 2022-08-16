import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('Products')
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Index()
    @Column('simple-array')
    category!: string[];

    @Column()
    price!: number;

    @Column('simple-array')
    size!: string[];

    @Column('simple-array')
    color!: string[];

    @Column({ default: 0 })
    liked!: number;

    @Index()
    @Column()
    brand!: string;

    @Column()
    thumbnail?: string;

    @Column('simple-array')
    photos?: string[];

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}
