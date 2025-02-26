import { useFormContext } from 'react-hook-form';
import { CheckboxInput } from '~/components/checkbox-input';
import { TextInput } from '~/components/text-input';
import { type MedicineFormData } from '../constants';

export function QuantityInput() {
    const { register, watch, setValue } = useFormContext<MedicineFormData>();
    const quantifiable = watch('quantifiable');

    return (
        <div className='grid gap-2'>
            <CheckboxInput
                id="quantifiable"
                label="Quantifiable?"
                checked={quantifiable}
                onChange={() => {
                    setValue('quantifiable', !quantifiable);
                }}
            />

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
