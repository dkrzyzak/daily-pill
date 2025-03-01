import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto, UpdateMedicineDto } from './medicine.dto';
import { UserId } from 'src/helpers';

@Controller('medicines')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Post()
    create(
        @Body() createMedicineDto: CreateMedicineDto,
        @UserId() userId: string,
    ) {
        return this.medicineService.create(createMedicineDto, userId);
    }

    @Get()
    findAll(@UserId() userId: string) {
        return this.medicineService.findAll(userId);
    }

    @Get(':id')
    findOne(@UserId() userId: string, @Param('id') id: string) {
        return this.medicineService.findOne(userId, id);
    }

    @Patch(':id')
    update(
        @UserId() userId: string,
        @Param('id') id: string,
        @Body() updateMedicineDto: UpdateMedicineDto,
    ) {
        return this.medicineService.update(userId, id, updateMedicineDto);
    }

    @Patch(':id/update-quantity')
    updateQuantity(
        @UserId() userId: string,
        @Param('id') id: string,
        @Body('newAmount') newAmount: number,
    ) {
        return this.medicineService.updateQuantity(userId, id, newAmount);
    }

    @Delete(':id')
    remove(@UserId() userId: string, @Param('id') id: string) {
        return this.medicineService.remove(userId, id);
    }
}
