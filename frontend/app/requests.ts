import type { CreateMedicineDto, MedicineDto } from './apiModels';
import axios from './axios';

export const createMedicine = (data: CreateMedicineDto) => {
    return axios.post<MedicineDto>('/medicines', data);
};
