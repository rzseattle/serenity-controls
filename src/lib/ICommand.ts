export interface ICommand {
    key: string;
    icon?: string;
    label: string;
    onClick?: (event: React.MouseEvent) => any;
    subItems?: ICommand[];
}
