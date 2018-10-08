import * as React from "react";
import { fI18n } from "../lib";



export interface ICommand {
    key: string;
    icon?: string;
    label: string;
    onClick?: (event: React.MouseEvent) => any;
    subItems?: ICommand[];
}

interface IProps {
    isSearchBoxVisible?: boolean;
    searchPlaceholderText?: string;
    onSearch?: (value: string) => any;
    onSearchChange?: (value: string) => any;
    items: ICommand[];
    rightItems?: Array<ICommand | null>;
    zIndex?: number;
}

export default class CommandBar extends React.PureComponent<IProps> {
    public static defaultProps: Partial<IProps> = {
        isSearchBoxVisible: false,
        searchPlaceholderText: null,
        items: [],
        rightItems: [],
    };

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchedText: "",
        };
    }

    public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchedText: event.target.value });
        if (this.props.onSearchChange) {
            this.props.onSearchChange(event.target.value);
        }
    };

    public handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode == 13) {
            if (this.props.onSearch) {
                this.props.onSearch((event.target as HTMLInputElement).value);
            }
        }
    };

    public render() {
        const zIndex = this.props.zIndex != undefined ? this.props.zIndex : 99;
        return (
            <div className="w-command-bar" style={{ zIndex }}>
                {this.props.isSearchBoxVisible && (
                    <div className="search-box">
                        <i className="ms-Icon ms-Icon--Search " />
                        <input
                            type="text"
                            onChange={this.handleSearchChange}
                            onKeyUp={this.handleSearchKeyDown}
                            placeholder={
                                this.props.searchPlaceholderText
                                    ? this.props.searchPlaceholderText
                                    : fI18n.t("frontend:search") + "..."
                            }
                            autoFocus={true}
                        />
                    </div>
                )}
                <div className="menu-bar">
                    <div className="buttons-left">
                        {this.props.items.map((item: ICommand | false, index: number) => {
                            if (item !== null && item !== false) {
                                if (item.subItems !== undefined) {
                                    alert("need implementation");
                                } else {
                                    return (
                                        <a key={item.key} onClick={item.onClick}>
                                            <i className={"ms-Icon ms-Icon--" + item.icon} /> {item.label}
                                        </a>
                                    );
                                }
                            }
                            return null;
                        })}
                    </div>
                    <div className="buttons-right">
                        {this.props.rightItems.map((item: ICommand | false, index: number) => {
                            if (item !== null && item !== false) {
                                return (
                                    <a key={item.key} onClick={item.onClick} className="ms-font-m">
                                        <i className={"ms-Icon ms-Icon--" + item.icon} /> {item.label}
                                    </a>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export { CommandBar };
