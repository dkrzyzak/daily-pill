import { z, type ZodTypeAny } from 'zod';

export const preprocessNumber = <I extends ZodTypeAny>(schema: I) =>
    z.preprocess((val) => parseFloat(val as string), schema);

const intakeTime = z.enum(['morning', 'afternoon', 'night', 'custom']);

export const scheduleSchema = z.object({
    dosage: preprocessNumber(z.number().positive()),
    frequency: preprocessNumber(z.number().positive()),
    intakeTime: z.array(intakeTime),
    intakeTimeCustom: z.string().optional(),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
export type IntakeTime = z.infer<typeof intakeTime>;

export const scheduleInitialData: ScheduleFormData = {
    dosage: 1,
    frequency: 1,
    intakeTime: ['morning'],
    intakeTimeCustom: undefined,
};
