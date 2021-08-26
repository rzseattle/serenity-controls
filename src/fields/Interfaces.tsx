export interface IOption {
    value: string | number;
    label: string | number;
}

export interface IFieldProps {
    /**
     * Class added to field
     */
    className?: string;
    /**
     * Field name
     */
    name?: string;
    /**
     * Field value
     */
    value?: any;
    /**
     * On change event
     */
    onChange?: (changeData: IFieldChangeEvent) => any;
    /**
     * Is field disabled
     */
    disabled?: boolean;
    /**
     * Is field editable
     */
    editable?: boolean;
    /**
     * Style to apply on field
     */
    style?: React.CSSProperties;
    /**
     * Placeholder string
     */
    placeholder?: string;
    /**
     * Autofocus on field
     */
    autoFocus?: boolean;
    /**
     * Class when field is disabled
     * @deprecated
     */
    disabledClass?: string;
}

export interface IFieldChangeEvent {
    /**
     * Field name
     */
    name: string;
    /**
     * Field type
     */
    type?: string;
    /**
     * Field value
     */
    value: any;
    /**
     * React event
     */
    event?: React.FormEvent;
    /**
     * Some additional data
     */
    data?: any;
}
