import { Dropdown } from 'primereact/dropdown';
import { useFormContext } from 'react-hook-form';
import type { ScheduleFormData } from '../constants';
import type { SelectItem } from 'primereact/selectitem';

interface FrequencySelectItem extends SelectItem {
    value: number;
}

const options: FrequencySelectItem[] = [
    { label: 'Everyday', value: 1 },
    { label: 'Every other day', value: 2 },
    { label: 'Every third day', value: 3 },
    { label: 'Every week', value: 7 },
    { label: 'Custom', value: -1 },
];

export function FrequencyInput() {
    const { watch, setValue } = useFormContext<ScheduleFormData>();
    const frequency = watch('frequency');

    return (
        <div>
            <div className="grid gap-2">
                <label htmlFor="frequency">How often</label>
                <Dropdown
                    inputId="frequency"
                    options={options}
                    value={frequency}
                    onChange={(e) => setValue('frequency', e.value as number)}
                />
            </div>
        </div>
    );
}
