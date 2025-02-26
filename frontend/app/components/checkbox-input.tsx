import { Checkbox, type CheckboxProps } from 'primereact/checkbox';

export type CheckboxInputProps = CheckboxProps & {
    id: string;
    label: string;
};

export function CheckboxInput({
    id,
    label,
    ...checkboxProps
}: CheckboxInputProps) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox inputId={id} {...checkboxProps} />
            <label htmlFor={id} className='cursor-pointer'>{label}</label>
        </div>
    );
}
