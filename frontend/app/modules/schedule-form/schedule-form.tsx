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
                onClick={form.handleSubmit(
                    (data) => {
                        console.log(data);
                    },
                    (errors) => {
                        console.log(errors);
                    },
                )}
            >
                <div className="border-2 bg-pink-900">{medicine.name}</div>

                <DosageInput medicine={medicine} />

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
