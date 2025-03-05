import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { useMemo, useRef } from 'react';
import { useRevalidator } from 'react-router';
import type { MedicineDto } from '~/apiModels';
import { removeMedicine } from '~/requests';

interface MedicineItemMenuProps {
    medicine: MedicineDto;
}

export function MedicineItemMenu({ medicine }: MedicineItemMenuProps) {
    const menuRef = useRef<Menu>(null);
    const revalidator = useRevalidator();

    const onDelete = () => {
        confirmDialog({
            message: (
                <span>
                    Do you want to delete <strong>{medicine.name}</strong> from
                    list?
                </span>
            ),
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            dismissableMask: true,
            accept: async () => {
                await removeMedicine(medicine.id);
                revalidator.revalidate();
            },
        });
    };

    const menuItems: MenuItem[] = useMemo(
        () => [
            { label: 'Edit', icon: 'pi pi-pencil' },
            { label: 'Delete', icon: 'pi pi-trash', command: onDelete },
        ],
        [],
    );

    return (
        <>
            <Button
                icon="pi pi-ellipsis-v"
                onClick={(e) => menuRef.current?.toggle(e)}
            />
            <Menu popup ref={menuRef} model={menuItems} />
        </>
    );
}
