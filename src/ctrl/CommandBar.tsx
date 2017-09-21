import * as React from "react";
import {ICommand} from "../lib/ICommand"

interface IProps {
    isSearchBoxVisible?: boolean;
    searchPlaceholderText?: string;
    onSearch?: {(value: string): any};
    items: Array<ICommand>,
    rightItems?: Array<ICommand | null>,
}


export class CommandBar extends React.Component<IProps, any> {

    public static defaultProps: Partial<IProps> = {
        isSearchBoxVisible: false,
        searchPlaceholderText: 'Szukaj',
        items: [],
        rightItems: []
    };


    constructor(props) {
        super(props);
        this.state = {
            searchedText: ''
        }
    }

    handleSearchKeyDown(event) {
        if (event.keyCode == 13) {
            if (this.props.onSearch) {
                this.props.onSearch(event.target.value);
            }
        }
        this.setState({searchedText: event.target.value})
    }

    render() {
        return <div className="w-command-bar">
            {this.props.isSearchBoxVisible && <div className="search-box">
                <i className="ms-Icon ms-Icon--Search "></i>
                <input type="text"
                       onKeyDown={this.handleSearchKeyDown.bind(this)}
                       placeholder="Szukaj..."
                       className="ms-font-m"
                       autoFocus/>
            </div>
            }
            <div className="menu-bar">
                <div className="buttons-left">
                    {this.props.items.map((item: ICommand, index: number) => {
                        if (item !== null) {
                            return <a key={item.key} onClick={item.onClick} className="ms-font-m">
                                <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label}
                            </a>
                        }
                        return null;
                    })}

                </div>
                <div className="buttons-right">
                    {this.props.rightItems.map((item: ICommand, index: number) => {
                        if (item !== null) {
                            return <a key={item.key} onClick={item.onClick} className="ms-font-m">
                                <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label}
                            </a>
                        }
                        return null;
                    })}
                </div>
            </div>


        </div>
    }
}
