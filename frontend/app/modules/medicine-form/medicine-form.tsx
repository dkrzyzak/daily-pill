import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from '~/components/text-input';
import {
    medicineInitialData,
    medicineSchema,
    type MedicineFormData,
} from './constants';
import { QuantityInput } from './form-controls/quantity-input';
import { TypeInput } from './form-controls/type-input';
import { Button } from 'primereact/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createMedicine } from '~/requests';
import { prepareMedicineData } from './helpers';
import { useRevalidator } from 'react-router';

interface MedicineFormProps {
    onHide: () => void;
}

export function MedicineForm({ onHide }: MedicineFormProps) {
    const revalidator = useRevalidator();

    const form = useForm<MedicineFormData>({
        defaultValues: medicineInitialData,
        resolver: zodResolver(medicineSchema),
    });

    const medicineMutation = useMutation({
        mutationFn: (data: MedicineFormData) => createMedicine(prepareMedicineData(data)),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSuccess: (_response) => {
            revalidator.revalidate();
            onHide();
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

                <QuantityInput />

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
