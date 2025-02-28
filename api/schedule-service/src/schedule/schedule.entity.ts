import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    medicineId: string;

    @Column()
    userId: string;

    @Column('date')
    startDate: Date;

    @Column('float', { nullable: true })
    dosage: number;

    @Column('int')
    frequency: number; // 1 == everyday, 2 == every other day....

    @Column()
    timeOfDay: string;
}