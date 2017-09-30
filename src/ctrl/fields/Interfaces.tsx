export interface Option {
    value: string;
    label: string;
}

export interface IFieldProps {
    className?: string,
    name?: string,
    value?: any,
    onChange?: { (changeData: IFieldChangeEvent): any },
    disabled?: boolean,
    editable?: boolean
    style?: any,
    placeholder?: string,
}

export interface IFieldChangeEvent {
    name: string
    type: string
    value: any
    event: Event
}