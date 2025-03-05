import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { useMemo, useRef } from 'react';
import type { MedicineDto } from '~/apiModels';
import { useMedicineContext } from '../schedule-form/medicine-context';

interface MedicineItemProps {
    medicine: MedicineDto;
    openScheduleForm: () => void;
}

/**
    TODO:
    - add button to remove item
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
    const menuRef = useRef<Menu>(null);
    const { setMedicine } = useMedicineContext();

    const menuItems: MenuItem[] = useMemo(
        () => [
            { label: 'Edit', icon: 'pi pi-pencil' },
            { label: 'Delete', icon: 'pi pi-trash' },
        ],
        [],
    );

    const onCreateSchedule = () => {
        setMedicine(medicine);
        openScheduleForm();
    };

    return (
        <div className="bg-cyan-900">
            <p className="font-bold text-2xl">{medicine.name}</p>
            <p>{medicine.type}</p>
            {medicine.quantity && <p>Remaining: {medicine.quantity} pills</p>}
            <Menu popup ref={menuRef} model={menuItems} />
            <Button icon="pi pi-calendar-clock" onClick={onCreateSchedule} />
            <Button
                icon="pi pi-ellipsis-v"
                onClick={(e) => menuRef.current?.toggle(e)}
            />
        </div>
    );
}
