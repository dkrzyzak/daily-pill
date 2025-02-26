import { useState } from 'react';
import { MedicineFormDialog } from './medicine-form-dialog';
import { Button } from 'primereact/button';

export function MedicineFormTrigger() {
    const [isDialogVisible, setDialogVisible] = useState(false);

    return (
        <>
            <Button
                className="grow"
                size="small"
                icon="pi pi-box"
                label="Add new medicine"
                onClick={() => setDialogVisible(true)}
            />

            <MedicineFormDialog
                isVisible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
            />
        </>
    );
}
