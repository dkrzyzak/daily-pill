import { Dialog } from 'primereact/dialog';
import { ScheduleForm } from './schedule-form';

interface ScheduleFormModalProps {
    isVisible: boolean;
    onHide: () => void;
}

export function ScheduleFormModal({
    isVisible,
    onHide,
}: ScheduleFormModalProps) {
    return (
        <Dialog
            closeOnEscape
            dismissableMask
            visible={isVisible}
            onHide={onHide}
            header="Create new schedule"
        >
            <ScheduleForm />
        </Dialog>
    );
}
