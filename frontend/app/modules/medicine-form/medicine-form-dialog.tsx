import { Dialog } from 'primereact/dialog';
import { MedicineForm } from './medicine-form';

interface MedicineFormDialogProps {
    isVisible: boolean;
    onHide: () => void;
}

export function MedicineFormDialog({
    isVisible,
    onHide,
}: MedicineFormDialogProps) {
    return (
        <Dialog
            closeOnEscape
            dismissableMask
            visible={isVisible}
            onHide={onHide}
            header="New medicine"
        >
            <MedicineForm />
        </Dialog>
    );
}
