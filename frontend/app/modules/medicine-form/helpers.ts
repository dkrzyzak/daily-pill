import type { CreateMedicineDto } from '~/apiModels';
import { type MedicineFormData, type MedicineType } from './constants';

export function prepareMedicineData(
    medicine: MedicineFormData,
): CreateMedicineDto {
    return {
        name: medicine.name,
        type: medicine.type,
        quantity: isQuantifiable(medicine.type) ? medicine.quantity! : null,
        refillNotification:
            isQuantifiable(medicine.type) && medicine.refillAlert
                ? medicine.refillAlertAt!
                : null,
    };
}

export const isQuantifiable = (type: MedicineType) => type === 'pill';