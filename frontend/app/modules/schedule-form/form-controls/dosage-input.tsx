import { useFormContext } from 'react-hook-form';
import { TextInput } from '~/components/text-input';
import type { ScheduleFormData } from '../constants';
import type { MedicineDto } from '~/apiModels';
import { isQuantifiable } from '~/modules/medicine-form/helpers';
import type { MedicineType } from '~/modules/medicine-form/constants';

interface DosageInputProps {
// TODO: verify if this should be a prop or is it better off as a context value
    medicine: MedicineDto;

}

export function DosageInput({ medicine }: DosageInputProps) {
    const { register } = useFormContext<ScheduleFormData>();

    const quantifiable = isQuantifiable(medicine.type as MedicineType);

    if (!quantifiable) {
        return null;
    }

    return (
        <TextInput
            id="dosage"
            label="How many pills?"
            {...register('dosage')}
            autoComplete="off"
        />
    );
}
