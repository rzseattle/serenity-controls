export interface IConnectionElement {
    value: string | number;
    label: string;
    icon?: () => JSX.Element;
    className?: string;
    data?: any;
}
