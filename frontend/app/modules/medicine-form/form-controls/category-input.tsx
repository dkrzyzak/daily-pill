import { Dropdown } from 'primereact/dropdown';
import type { SelectItem } from 'primereact/selectitem';
import { useFormContext } from 'react-hook-form';
import type { MedicineFormData } from '../constants';

const options: SelectItem[] = [
    { label: 'Medical', value: 'medical' },
    { label: 'Supplement', value: 'supplement' },
];

export function CategoryInput() {
    const { watch, setValue } = useFormContext<MedicineFormData>();
    const category = watch('category');

    return (
        <div className="grid gap-2">
            <label htmlFor="category">Category</label>
            <Dropdown
                inputId="category"
                options={options}
                value={category}
                onChange={(e) => setValue('category', e.value)}
            />
        </div>
    );
}
