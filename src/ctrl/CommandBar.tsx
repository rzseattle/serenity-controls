import * as React from "react";
import * as ReactDOM from "react-dom";
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
        searchPlaceholderText: __('Szukaj'),
        items: [],
        rightItems: []
    };


    constructor(props) {
        super(props);
        this.state = {
            searchedText: '',

            dropdownHeight: 0,
            dropdownShowed: false,
            dropdownVisible: 0,
            dropdownLayerVisible: "none",
            dropdownPosition: null,
            dropdownElementList: null,
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

                       autoFocus/>
            </div>
            }
            <div className="menu-bar">
                <div className="buttons-left">
                    {this.props.items.map((item: ICommand, index: number) => {
                        if (item !== null) {
                            if (item.subItems !== undefined){
                                let dropdownHeight = "100px";
                                let dropdownVisible = "1";
                                return (
                                <button className={"bar-dropdown"} key={item.key} onClick={(event) => {
                                    const elementPosittion = ReactDOM.findDOMNode(event.target).getBoundingClientRect();
                                    this.setState({
                                        dropdownElementList: item.subItems,
                                        dropdownPosition: elementPosittion.left,
                                    })
                                    if(this.state.dropdownHeight > 1){
                                        this.setState({
                                            dropdownHeight: 0,
                                            dropdownVisible: 0,
                                            dropdownLayerVisible: "none",
                                            dropdownShowed: false,
                                        })
                                    } else {
                                        this.setState({
                                            dropdownHeight: 500,
                                            dropdownVisible: 1,
                                            dropdownLayerVisible: "block",
                                            dropdownShowed: true,
                                        })
                                    }
                                }}>
                                    <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label} <i className={"ms-Icon ms-Icon--ChevronDown"}></i>
                                </button>
                                );
                            } else {
                            return <a key={item.key} onClick={item.onClick} >
                                <i className={"ms-Icon ms-Icon--" + item.icon}></i> {item.label}
                            </a>
                            }
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
                <div className={"dropdown-layer"} style={{display: this.state.dropdownLayerVisible}} onClick={() => {
                    this.setState({
                        dropdownLayerVisible: "none",
                        dropdownHeight: 0,
                        dropdownVisible: 0,
                    })
                }}></div>

                {this.state.dropdownShowed == true &&
                    <div className={"bar-dropdown-list"} style={{maxHeight: this.state.dropdownHeight, opacity: this.state.dropdownVisible, left: this.state.dropdownPosition - 60}}>
                        {this.state.dropdownElementList.map((element) => {
                            return <div className={"bar-dropdown-item"} key={element.key} onClick={element.onClick}><i className={"ms-Icon ms-Icon--" + element.icon}></i><span>{element.label}</span></div>
                        })}
                    </div>
                }
            </div>
        </div>
    }
}
