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
import { useMutation } from '@tanstack/react-query';
import axios from '~/axios';
import { toast } from 'sonner';

export function MedicineForm() {
    const form = useForm<MedicineFormData>({
        defaultValues: medicineInitialData,
        resolver: zodResolver(medicineSchema),
    });

    const medicineMutation = useMutation({
        mutationFn: (data: MedicineFormData) => axios.post('/medicines', data),
        onSuccess: (data: unknown) => {
            console.log(data);
            toast.success('Created new medicine');
        },
        onError: (error) => {
            console.log(error);
            toast.error('Medicine was not created...');
        },
    });

    return (
        <FormProvider {...form}>
            <form
                className="grid gap-4"
                onSubmit={form.handleSubmit(
                    (data) => {
                        medicineMutation.mutate(data);
                        console.log(data);
                    },
                    (errors) => {
                        console.log(errors);
                    },
                )}
            >
                <TextInput
                    id="name"
                    label="Name"
                    {...form.register('name')}
                    autoComplete="off"
                />

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
