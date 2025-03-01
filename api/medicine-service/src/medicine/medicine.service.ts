import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medicine } from './medicine.entity';
import { Repository } from 'typeorm';
import { CreateMedicineDto, UpdateMedicineDto } from './medicine.dto';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private medicineRepository: Repository<Medicine>,
    ) {}

    async create(createMedicineDto: CreateMedicineDto, userId: string) {
        const medicine = this.medicineRepository.create({
            ...createMedicineDto,
            userId,
        });
        return this.medicineRepository.save(medicine);
    }

    async findAll(userId: string) {
        return this.medicineRepository.find({
            where: { userId },
            order: { name: 'ASC' },
        });
    }

    async findOne(userId: string, id: string) {
        const medicine = await this.medicineRepository.findOneBy({
            userId,
            id,
        });

        if (!medicine) {
            throw new NotFoundException('Medicine not found');
        }

        return medicine;
    }

    async update(
        userId: string,
        id: string,
        updateMedicineDto: UpdateMedicineDto,
    ): Promise<Medicine> {
        const medicine = await this.findOne(userId, id);
        const updatedMedicine = { ...medicine, ...updateMedicineDto };

        // TODO: take action when quantity dropped below alert level

        return this.medicineRepository.save(updatedMedicine);
    }

    async updateQuantity(userId: string, id: string, newAmount: number) {
        const medicine = await this.findOne(userId, id);
        medicine.quantity = Math.max(0, newAmount);

        // TODO: take action when quantity dropped below alert level

        return this.medicineRepository.save(medicine);
    }

    async remove(userId: string, id: string) {
        const medicine = await this.findOne(userId, id);
        await this.medicineRepository.remove(medicine);
    }
}
