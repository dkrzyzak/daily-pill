import type { MedicineDto } from '~/apiModels';

interface MedicineItemProps {
    medicine: MedicineDto;
}

/**
    TODO:
    - remove item
    - edit quantity
    - show warning if low quantity
    - display icon of type rather then name itself
    - display schedule
    - add new schedule
    - display due date
 */

export function MedicineItem({ medicine }: MedicineItemProps) {
    return (
        <div className='bg-cyan-900'>
            <p className='font-bold text-2xl'>{medicine.name}</p>
            <p>{medicine.type}</p>
            {medicine.quantity && <p>Remaining: {medicine.quantity} pills</p>}
        </div>
    );
}
