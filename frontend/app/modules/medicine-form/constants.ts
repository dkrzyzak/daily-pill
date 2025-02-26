import { z, type ZodTypeAny } from 'zod';

const medicineCategory = z.enum(['supplement', 'medical']);

export const preprocessNumber = <I extends ZodTypeAny>(schema: I) =>
    z.preprocess((val) => parseFloat(val as string), schema);

export const medicineSchema = z.object({
    name: z.string().min(2, 'Missing name'),
    category: medicineCategory,

    quantifiable: z.boolean(),
    quantity: preprocessNumber(z.number().positive()).optional(),

    refillAlert: z.boolean(),
    refillAlertAt: preprocessNumber(z.number().positive()).optional(),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;
export type Category = MedicineFormData['category'];

export const medicineInitialData: MedicineFormData = {
    name: '',
    category: 'medical',
    quantifiable: true,
    quantity: 30,
    refillAlert: true,
    refillAlertAt: 7,
};
