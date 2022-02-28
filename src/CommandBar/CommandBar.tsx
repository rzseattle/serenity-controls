import * as React from "react";
import { fI18n } from "../lib";
import { CommandMenu } from "../CommandMenu";
import "./CommandBar.sass";

import { CommonIcons } from "../lib/CommonIcons";

export interface ICommand {
    key: string;
    icon?: React.JSXElementConstructor<any>;
    label: string;
    onClick?: (event: React.MouseEvent, context: any) => any;
    subItems?: ICommand[];
}

interface IProps {
    isSearchBoxVisible?: boolean;
    searchPlaceholderText?: string;
    onSearch?: (value: string) => any;
    onSearchChange?: (value: string) => any;
    items: ICommand[];
    rightItems?: (ICommand | null)[];
    zIndex?: number;
}

export class CommandBar extends React.PureComponent<IProps> {
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

    public handleExpandMenu = (item: ICommand, event: React.MouseEvent) => {};

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
        return (
            <div className="w-command-bar">
                {this.props.isSearchBoxVisible && (
                    <div className="search-box">
                        <CommonIcons.search />
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
                        {this.props.items.map((item: ICommand | false) => {
                            if (item !== null && item !== false) {
                                return (
                                    <React.Fragment key={item.key}>
                                        <CommandMenu items={item.subItems} activation={"hover"}>
                                            {(opened) => {
                                                return (
                                                    <a
                                                        onClick={(event) =>
                                                            item.subItems
                                                                ? this.handleExpandMenu(item, event)
                                                                : item.onClick(event, null)
                                                        }
                                                        className={opened ? "w-command-bar-element-opened" : ""}
                                                    >
                                                        {item.icon && <item.icon />} {item.label}
                                                        {item.subItems && <CommonIcons.chevronDown />}
                                                    </a>
                                                );
                                            }}
                                        </CommandMenu>
                                    </React.Fragment>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="buttons-right">
                        {this.props.rightItems.map((item: ICommand | false) => {
                            if (item !== null && item !== false) {
                                return (
                                    <React.Fragment key={item.key}>
                                        <CommandMenu items={item.subItems} activation={"hover"}>
                                            {(opened) => {
                                                return (
                                                    <a
                                                        onClick={(event) =>
                                                            item.subItems
                                                                ? this.handleExpandMenu(item, event)
                                                                : item.onClick(event, null)
                                                        }
                                                        className={opened ? "w-command-bar-element-opened" : ""}
                                                    >
                                                        {item.icon && <item.icon />} {item.label}
                                                        {item.subItems && <CommonIcons.chevronDown />}
                                                    </a>
                                                );
                                            }}
                                        </CommandMenu>
                                    </React.Fragment>
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
