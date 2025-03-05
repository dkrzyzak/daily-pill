import { FormProvider, useForm } from 'react-hook-form';
import {
    scheduleInitialData,
    scheduleSchema,
    type ScheduleFormData,
} from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { useMedicineContext } from './medicine-context';
import { DosageInput } from './form-controls/dosage-input';
import { FrequencyInput } from './form-controls/frequency-input';

export function ScheduleForm() {
    const { medicine } = useMedicineContext();
    const form = useForm<ScheduleFormData>({
        defaultValues: scheduleInitialData,
        resolver: zodResolver(scheduleSchema),
    });

    return (
        <FormProvider {...form}>
            <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(
                    (data) => {
                        console.log(data);
                    },
                    (errors) => {
                        console.log(errors);
                    },
                )}
            >
                <p className="border-surface-200 border p-2 bg-surface-section/50 text-white/75">{medicine.name}</p>

                <DosageInput medicine={medicine} />

                <FrequencyInput />

                <Button
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    label="Continue"
                    type="submit"
                />
            </form>
        </FormProvider>
    );
}
