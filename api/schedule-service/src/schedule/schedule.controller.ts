import { Body, Controller, Get, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './schedule.dto';
import { UserId } from 'src/helpers';


@Controller('schedules')
export class ScheduleController {
    constructor (private readonly schedulesService: ScheduleService) {}

    @Post()
    create(@Body() createScheduleDto: CreateScheduleDto) {
        return this.schedulesService.create(createScheduleDto);
    }

    @Get()
    findAll(@UserId() userId: string) {
        return this.schedulesService.findAll(userId);
    }
}