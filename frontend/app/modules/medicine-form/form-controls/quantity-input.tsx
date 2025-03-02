import { useFormContext } from 'react-hook-form';
import { type MedicineFormData } from '../constants';
import { CheckboxInput } from '~/components/checkbox-input';
import { TextInput } from '~/components/text-input';
import { Expandable } from '~/components/expandable';
import { isQuantifiable } from '../helpers';

export function QuantityInput() {
    const { register, watch, setValue } = useFormContext<MedicineFormData>();
    const type = watch('type');
    const quantifiable = isQuantifiable(type);

    const refillAlert = watch('refillAlert');

    return (
        <div className="grid gap-4">
            <Expandable expanded={quantifiable}>
                <TextInput
                    id="quantity"
                    label="Quantity"
                    {...register('quantity')}
                />
            </Expandable>

            <Expandable expanded={quantifiable}>
                <CheckboxInput
                    id="refillAlert"
                    label="Refill notification?"
                    checked={refillAlert}
                    onChange={() => {
                        setValue('refillAlert', !refillAlert);
                    }}
                />
            </Expandable>

            <Expandable expanded={quantifiable && refillAlert}>
                <TextInput
                    id="refillAlertQty"
                    label="Notify when less than"
                    {...register('refillAlertAt')}
                />
            </Expandable>
        </div>
    );
}
