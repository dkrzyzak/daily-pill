import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { CreateScheduleDto, UpdateScheduleDto } from './schedule.dto';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>,
        // private readonly medicineService: any,
    ) {}

    async create(createScheduleDto: CreateScheduleDto) {
        const schedulesPromises = createScheduleDto.timesOfDay.map(async (timeOfDay) => {
            const schedule = this.scheduleRepository.create({
                ...createScheduleDto,
                timeOfDay,
            });

            await this.scheduleRepository.save(schedule);
            return schedule;
        });

        const schedules = await Promise.all(schedulesPromises);

        return schedules;
    }

    async findAll(userId: string) {
        return this.scheduleRepository.find({
            where: { userId },
        });
    }

    async findOne(userId: string, id: string) {
        const schedule = await this.scheduleRepository.findOneBy({ userId, id });

        if (!schedule) {
            throw new NotFoundException(`Schedule with ID: ${id} not found`);
        }

        return schedule;
    }

    async update(userId: string, id: string, updateScheduleDto: UpdateScheduleDto) {
        // TODO: implement updating only one particular schedule (with one timeOfDay, not array of timesOfDay)
    }

    async remove(userId: string, id: string) {
        const schedule = await this.findOne(userId, id);
        await this.scheduleRepository.remove(schedule);
    }

    async findSchedulesForToday(userId: string) {
        const schedules = await this.findAll(userId);

        // TODO: implement actual logic

        return schedules;
    }

    async getSchedulesWithMedicineDetails(userId: string) {}

    async getSchedulesForTodayWithMedicineDetails(userId: string) {}
}
