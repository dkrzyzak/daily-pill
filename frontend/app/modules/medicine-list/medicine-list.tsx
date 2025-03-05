import type { MedicineDto } from '~/apiModels';
import { MedicineItem } from '../medicine-item/medicine-item';
import { MedicineContextProvider } from '../schedule-form/medicine-context';
import { useCallback, useState } from 'react';
import { ScheduleFormModal } from '../schedule-form/schedule-form-modal';

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

    return (
        <MedicineContextProvider medicine={medicines[0]}>
            <section className={className}>
                <h1 className="text-3xl">Medicine you have:</h1>
                <div className="grid gap-4">
                    {medicines.map((medicine) => (
                        <MedicineItem key={medicine.id} medicine={medicine} openScheduleForm={openScheduleForm} />
                    ))}
                </div>
            </section>

            <ScheduleFormModal
                isVisible={scheduleFormOpened}
                onHide={closeScheduleForm}
            />
        </MedicineContextProvider>
    );
}
