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

const userId = 'to be taken from cookies';

@Controller('medicine')
export class MedicineController {
    constructor(private readonly medicineService: MedicineService) {}

    @Post()
    create(@Body() createMedicineDto: CreateMedicineDto) {
        return this.medicineService.create(createMedicineDto);
    }

    @Get()
    findAll() {
        return this.medicineService.findAll(userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.medicineService.findOne(userId, id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMedicineDto: UpdateMedicineDto,
    ) {
        return this.medicineService.update(userId, id, updateMedicineDto);
    }

    @Patch(':id/update-quantity')
    updateQuantity(
        @Param('id') id: string,
        @Body('newAmount') newAmount: number,
    ) {
        return this.medicineService.updateQuantity(userId, id, newAmount);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.medicineService.remove(userId, id);
    }
}
