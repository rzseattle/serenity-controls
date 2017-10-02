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
    autoFocus?: boolean
}

export interface IFieldChangeEvent {
    name: string
    type: string
    value: any
    event: Event
}