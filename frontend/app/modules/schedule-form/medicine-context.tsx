import { createContext, use, useState, type ReactNode } from 'react';
import type { MedicineDto } from '~/apiModels';

type MedicineContextValue = {
    medicine: MedicineDto;
    setMedicine: (medicine: MedicineDto) => void;
};

export const MedicineContext = createContext<MedicineContextValue | null>(null);

interface MedicineContextProviderProps {
    medicine: MedicineDto;
    children: ReactNode;
}

export function MedicineContextProvider({
    medicine: defaultMedicine,
    children,
}: MedicineContextProviderProps) {
    const [medicine, setMedicine] = useState(defaultMedicine);

    const contextValue: MedicineContextValue = {
        medicine,
        setMedicine,
    };

    return (
        <MedicineContext.Provider value={contextValue}>
            {children}
        </MedicineContext.Provider>
    );
}

export function useMedicineContext() {
    const value = use(MedicineContext);

    if (!value) {
        throw new Error(
            'You tried to use MedicineContext outside its Provider',
        );
    }

    return value;
}
