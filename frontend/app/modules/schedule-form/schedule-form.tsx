import { FormProvider, useForm } from 'react-hook-form';
import {
    scheduleInitialData,
    scheduleSchema,
    type ScheduleFormData,
} from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';

export function ScheduleForm() {
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
