import { Dropdown } from 'primereact/dropdown';
import type { SelectItem } from 'primereact/selectitem';
import { useFormContext } from 'react-hook-form';
import type { MedicineType, MedicineFormData } from '../constants';

interface TypeSelectItem extends SelectItem {
    value: MedicineType;
}

const options: TypeSelectItem[] = [
    { label: 'Pill', value: 'pill' },
    { label: 'Cream', value: 'cream' },
    { label: 'Aerosol', value: 'aerosol' },
    { label: 'Drops', value: 'drops' },
    { label: 'Spray', value: 'spray' },
    { label: 'Other', value: 'other' },
];

export function TypeInput() {
    const { watch, setValue } = useFormContext<MedicineFormData>();
    const type = watch('type');

    return (
        <div className="grid gap-2">
            <div className="grid gap-2">
                <label htmlFor="type">Category</label>
                <Dropdown
                    inputId="type"
                    options={options}
                    value={type}
                    onChange={(e) => setValue('type', e.value as MedicineType)}
                />
            </div>
        </div>
    );
}
