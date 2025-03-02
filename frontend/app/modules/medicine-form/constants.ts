import { z, type ZodTypeAny } from 'zod';

export const medicineType = z.enum([
    'pill',
    'cream',
    'spray',
    'aerosol',
    'drops',
    'other',
]);

export const preprocessNumber = <I extends ZodTypeAny>(schema: I) =>
    z.preprocess((val) => parseFloat(val as string), schema);

export const medicineSchema = z.object({
    name: z.string().min(2, 'Missing name'),

    type: medicineType,
    quantity: preprocessNumber(z.number().positive()).optional(),

    refillAlert: z.boolean(),
    refillAlertAt: preprocessNumber(z.number().positive()).optional(),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;
export type MedicineType = z.infer<typeof medicineType>;

export const medicineInitialData: MedicineFormData = {
    name: '',
    type: 'pill',
    quantity: 30,
    refillAlert: true,
    refillAlertAt: 7,
};
