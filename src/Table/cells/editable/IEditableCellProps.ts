export interface IEditableCellProps {
    inputValue: string;
    onSubmit: (value: any) => any;
    onCancel: () => any;
}

export type IEditableCell = (props: IEditableCellProps) => JSX.Element;
