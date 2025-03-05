import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsNotEmpty, IsString } from 'class-validator';

// TODO: sync with frontend
export class CreateMedicineDto {
    @IsNotEmpty({ message: "Missing or empty 'name' parameter" })
    @IsString({ message: "Parameter 'name' must be string" })
    name: string;

    @IsNotEmpty({ message: "Missing or empty 'type' parameter" })
    @IsString({ message: "Parameter 'type' must be string" })
    type: string;

    @IsNumber()
    @IsOptional()
    quantity: number;

    @IsNumber()
    @IsOptional()
    refillNotification: number;
}

// TODO: details: expiry date, picture? icon? 

export class UpdateMedicineDto extends PartialType(CreateMedicineDto) {}
