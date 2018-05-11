import * as React from "react";
import Comm from "frontend/src/lib/Comm";
import Icon from "frontend/src/ctrl/Icon";
import * as ReactDOM from "react-dom";
import { ICommand } from "../lib/ICommand";

interface IProps {
    searcherPlaceholder?: string;
    noResultText: string,
    dataURL?: string;
    onSelect: any;
    style: object;
}

export class Searcher extends React.Component<IProps, any> {
    public input: any;

    public static defaultProps: Partial<IProps> = {
        searcherPlaceholder: "Szukaj",
        noResultText: "Nie znaleziono",
        style: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            placeholder: this.props.searcherPlaceholder,
            dataURL: this.props.dataURL,
            data: null,
            icon: "Search",
            listVisible: "none",
            noResultText: null,
        };
    }

    _handleGetData(value){
        const data = {
            value: value,
        };
        Comm._post(this.props.dataURL, data)
            .then((response) => {
                console.log(response.items.length, "Searcher response");

                if (response.items.length == 0){
                    this.setState({
                        data: null,
                        noResultText: this.props.noResultText,
                    });
                    console.log(this.state.noResultText, "no result text");
                } else {
                    this.setState({
                        data: response,
                    });
                }
            })
            .catch((error) => {
                console.log(error, "Searcher error");
            });
    };

    _handleOnSelect(item){
        this.props.onSelect(item);
    }

    render() {
        return (
            <div style={this.props.style} className={"w-searcher"}>
                <div className={"w-searcher-input-handler"}>
                    <input
                        ref={(el) => this.input = el}
                        className={"w-searcher-input"}
                        type={"text"}
                        placeholder={this.state.placeholder}
                        onBlur={() => {
                            setTimeout(() => {
                                this.setState({
                                    data: null,
                                    listVisible: "none",
                                });
                            }, 200);
                        }}
                        onChange={(element) => {
                            if (element.target.value.length > 3) {
                                this._handleGetData(element.target.value);
                                this.setState({
                                    listVisible: "block",
                                });
                            } else {
                                this.setState({
                                    data: null,
                                    listVisible: "none",
                                });
                            }
                    }}
                    />
                    {this.state.icon == "Search" ?
                        <div
                            onClick={() => {
                                this.input.focus();
                            }}
                            className={"w-searcher-icon-handler"}>
                            <Icon name={"Search"}/>
                        </div>
                        :
                        <div
                            onClick={() => {
                                this.input.value = "";
                                this.setState({
                                    icon: "Search",
                                });
                            }}
                            className={"w-searcher-icon-handler icon-delete"}>
                            <Icon name={"Delete"}/>
                        </div>
                    }

                </div>
                <div style={{display: this.state.listVisible}} className={"w-searcher-item-list"}>
                    {this.state.data ?
                        this.state.data.items.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    className={"w-searcher-item"}
                                    onClick={() => {
                                        this._handleOnSelect(item);
                                        this.setState({
                                            data: null,
                                            icon: "Delete",
                                            listVisible: "none",
                                        });
                                        this.input.value = item.name + " [" + item.index + "]";
                                    }}
                                >{item.name} <span className={"bold"}>[{item.index}]</span></div>
                            );
                        })
                        : <div className={"w-searcher-no-result"}>{this.props.noResultText}</div>
                    }
                </div>
            </div>
        );
    }
}
