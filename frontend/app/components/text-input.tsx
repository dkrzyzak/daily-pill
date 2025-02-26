import {
    InputText,
    type InputTextProps as InputTextPropsBase,
} from 'primereact/inputtext';

export type TextInputProps = InputTextPropsBase & {
    id: string;
    label: string;
    info?: string;
};

export function TextInput({ id, label, info, ...restProps }: TextInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <InputText id={id} {...restProps} />
            {info && <small>{info}</small>}
        </div>
    );
}
