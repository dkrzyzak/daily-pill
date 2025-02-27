import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medicines')
export class Medicine {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column('float', { nullable: true })
    quantity: number;

    @Column({ nullable: true })
    refillNotification: number;
}
