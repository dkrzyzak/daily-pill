import { Dropdown } from 'primereact/dropdown';
import type { SelectItem } from 'primereact/selectitem';
import { useFormContext } from 'react-hook-form';
import type { MedicineForm, MedicineFormData } from '../constants';
import { TextInput } from '~/components/text-input';

interface FormSelectItem extends SelectItem {
    value: MedicineForm;
}

const options: FormSelectItem[] = [
    { label: 'Pill', value: 'pill' },
    { label: 'Cream', value: 'cream' },
    { label: 'Aerosol', value: 'aerosol' },
    { label: 'Drops', value: 'drops' },
    { label: 'Spray', value: 'spray' },
    { label: 'Other', value: 'other' },
];

export function TypeInput() {
    const { watch, setValue, register } = useFormContext<MedicineFormData>();
    const type = watch('type');
    const quantifiable = type === 'pill';

    return (
        <div className="grid gap-2">
            <div className="grid gap-2">
                <label htmlFor="type">Category</label>
                <Dropdown
                    inputId="type"
                    options={options}
                    value={type}
                    onChange={(e) => setValue('type', e.value as MedicineForm)}
                />
            </div>

            {quantifiable && (
                <TextInput
                    id="quantity"
                    label="Quantity"
                    {...register('quantity')}
                />
            )}
        </div>
    );
}
