export interface CreateMedicineDto {
    name: string;
    type: string;
    quantity: number | null;
    refillNotification: number | null;
}

export interface MedicineDto {
    id: string;
    userId: string;
    name: string;
    type: string;
    quantity: number | null;
    refillNotification: number | null;
}

export interface CreateScheduleDto {}

export interface Schedule {}
