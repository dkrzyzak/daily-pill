import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { HttpModule } from '@nestjs/axios';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
    imports: [TypeOrmModule.forFeature([Schedule]), HttpModule],
    controllers: [ScheduleController],
    providers: [ScheduleService],
})
export class ScheduleModule {}
