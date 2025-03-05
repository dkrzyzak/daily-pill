import { Button } from 'primereact/button';
import type { MedicineDto } from '~/apiModels';
import { useMedicineContext } from '../schedule-form/medicine-context';
import { MedicineItemMenu } from './medicine-item-menu';

interface MedicineItemProps {
    medicine: MedicineDto;
    openScheduleForm: () => void;
}

/**
    TODO:
    - add button to edit quantity
    - show warning if low quantity
    - display icon of type rather then name itself
    - display existing schedule for this medicine
    - add new schedule
    - add information/alert if there is already a schedule for this medicine 
    - display due date
 */

export function MedicineItem({
    medicine,
    openScheduleForm,
}: MedicineItemProps) {
    const { setMedicine } = useMedicineContext();

    const onCreateSchedule = () => {
        setMedicine(medicine);
        openScheduleForm();
    };

    return (
        <div className="bg-cyan-900">
            <p className="font-bold text-2xl">{medicine.name}</p>
            <p>{medicine.type}</p>
            {medicine.quantity && <p>Remaining: {medicine.quantity} pills</p>}

            <Button icon="pi pi-calendar-clock" onClick={onCreateSchedule} />
            <MedicineItemMenu medicine={medicine} />
        </div>
    );
}
