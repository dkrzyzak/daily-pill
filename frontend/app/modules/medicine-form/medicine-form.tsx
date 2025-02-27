import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from '~/components/text-input';
import {
    medicineInitialData,
    medicineSchema,
    type MedicineFormData,
} from './constants';
import { RefillInput } from './form-controls/refill-input';
import { TypeInput } from './form-controls/type-input';
import { Button } from 'primereact/button';

export function MedicineForm() {
    const form = useForm<MedicineFormData>({
        defaultValues: medicineInitialData,
        resolver: zodResolver(medicineSchema),
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
                <TextInput id="name" label="Name" {...form.register('name')} />

                <TypeInput />

                <RefillInput />

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
