import { PartialType } from '@nestjs/mapped-types';
import {
    IsArray,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateScheduleDto {
    @IsUUID()
    medicineId: string;

    @IsDate()
    startDate: Date;

    @IsNumber()
    @IsOptional()
    dosage: number;

    @IsNumber()
    frequency: number;

    @IsArray()
    @IsString({ each: true })
    timesOfDay: string[];
}

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
