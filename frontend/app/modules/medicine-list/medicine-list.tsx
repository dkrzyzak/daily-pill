import type { MedicineDto } from '~/apiModels';
import { MedicineItem } from '../medicine-item/medicine-item';
import { MedicineContextProvider } from '../schedule-form/medicine-context';
import { useCallback, useState } from 'react';
import { ScheduleFormModal } from '../schedule-form/schedule-form-modal';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface Props {
    medicines: MedicineDto[];
    className?: string;
}

export function MedicineList({ medicines, className }: Props) {
    const [scheduleFormOpened, setScheduleFormOpened] = useState(false);

    const openScheduleForm = useCallback(() => {
        setScheduleFormOpened(true);
    }, []);

    const closeScheduleForm = useCallback(() => {
        setScheduleFormOpened(false);
    }, []);

    if (medicines.length === 0) {
        return (
            <div className='text-center mt-12 text-3xl'>
                <h2>You don't have any medicine</h2>
            </div>
        );
    }

    return (
        <MedicineContextProvider medicine={medicines[0]}>
            <section className={className}>
                <h1 className="text-3xl">Medicine you have:</h1>
                <div className="grid gap-4">
                    {medicines.map((medicine) => (
                        <MedicineItem
                            key={medicine.id}
                            medicine={medicine}
                            openScheduleForm={openScheduleForm}
                        />
                    ))}
                </div>
            </section>

            <ScheduleFormModal
                isVisible={scheduleFormOpened}
                onHide={closeScheduleForm}
            />

            <ConfirmDialog />
        </MedicineContextProvider>
    );
}
