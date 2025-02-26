import { useFormContext } from 'react-hook-form';
import type { MedicineFormData } from '../constants';
import { CheckboxInput } from '~/components/checkbox-input';
import { TextInput } from '~/components/text-input';

export function RefillInput() {
    const { register, watch, setValue } = useFormContext<MedicineFormData>();
        const refillAlert = watch('refillAlert');
    
        return (
            <div className='grid gap-2'>
                <CheckboxInput
                    id="refillAlert"
                    label="Refill notification?"
                    checked={refillAlert}
                    onChange={() => {
                        setValue('refillAlert', !refillAlert);
                    }}
                />
    
                {refillAlert && (
                    <TextInput
                        id="refillAlertQty"
                        label="Notify when less than"
                        {...register('refillAlertAt')}
                    />
                )}
            </div>
        );
}
