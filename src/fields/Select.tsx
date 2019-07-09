import * as React from "react";

// @ts-ignore
import Hotkeys from "react-hot-keys";

import { Positioner, RelativePositionPresets } from "../Positioner";

//import { List, AutoSizer, CellMeasurer, CellMeasurerCache, ListRowProps } from "react-virtualized";

import { DynamicSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./Select.sass";
import { IFieldChangeEvent, IFieldProps, IOption } from "./Interfaces";
import { Icon } from "../Icon";
import { fI18n } from "../lib";

console.log(AutoSizer);

interface ISelectChangeEvent extends IFieldChangeEvent {
    selectedIndex: number;
}

export interface ISelectProps extends IFieldProps {
    options: IOption[] | { [key: string]: string };
    onChange?: (changeData: ISelectChangeEvent) => any;
    allowClear?: boolean;
    value: string | number;
    disabledClass?: string;
    showSearchField?: boolean;
    minLengthToShowSearchField?: number;
    onOpen?: () => any;
    onClose?: () => any;
}

interface ISelectState {
    filteredOptions: IOption[];
    dropdownVisible: boolean;
    searchedTxt: string;
    highlightedIndex: number;
}

export class Select extends React.Component<ISelectProps, ISelectState> {
    public static defaultProps: Partial<ISelectProps> = {
        options: [],
        editable: true,
        allowClear: false,
        autoFocus: false,
        showSearchField: true,
        minLengthToShowSearchField: 6,
        style: {},
    };
    private dropdown: HTMLDivElement;
    private presenter: HTMLDivElement;
    private searchField: HTMLInputElement | null;
    private cache: any;

    private rowHeights: number[] = [];

    private dynamicList: any;

    constructor(props: ISelectProps) {
        super(props);

        let options = props.options;
        if (!Array.isArray(props.options)) {
            options = Object.entries(props.options).map(([key, val]) => ({ value: key, label: val }));
        }

        this.state = {
            dropdownVisible: false,
            searchedTxt: "",
            highlightedIndex: -1,
            filteredOptions: options as IOption[],
        };

        /*this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 30,
        });*/
        //this.rowHeights =
    }

    /*shouldComponentUpdate(nextProps, nextState) {

        return !deepIsEqual(
            [
                this.props.columns,
                this.props.onPage,
                this.props.currentPage
            ],
            [
                nextProps.columns,
                nextProps.onPage,
                nextProps.currentPage
            ]
        )
    }*/

    public componentDidMount() {
        // this.handleDropdownChange();

        if (this.props.autoFocus) {
            this.handleDropdownChange();
        }
    }

    public handleDropdownChange = () => {
        let options = this.props.options;
        if (!Array.isArray(options)) {
            options = Object.entries(options).map(([key, val]) => ({ value: key, label: val }));
        }

        this.setState(
            {
                dropdownVisible: !this.state.dropdownVisible,
                searchedTxt: "",
                filteredOptions: options,
            },
            () => {
                if (this.state.dropdownVisible) {
                    if (this.searchField) {
                        this.searchField.focus();
                    } else {
                        this.dropdown.focus();
                    }

                    if (this.props.onOpen) {
                        this.props.onOpen();
                    }
                } else {
                    if (this.props.onClose) {
                        this.props.onClose();
                    }
                }
            },
        );
    };

    private handleChange = (value: any, index: number = -1) => {
        if (index > 0) {
            this.setState({ highlightedIndex: index });
        }
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "select",
                value,
                selectedIndex: null,
                event: null,
            });
        }
        this.dynamicList.forceUpdate();
    };

    private handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        this.handleChange(null);
    };

    private onKeyDown = (keyName: string, e: React.KeyboardEvent, handle: any) => {
        e.preventDefault();
        if (keyName == "up") {
            this.setState({ highlightedIndex: Math.max(0, this.state.highlightedIndex - 1) });
        } else if (keyName == "down") {
            this.setState({
                highlightedIndex: Math.min(this.state.filteredOptions.length - 1, this.state.highlightedIndex + 1),
            });
        } else if (keyName == "enter") {
            const el = this.state.filteredOptions[this.state.highlightedIndex];
            if (el !== undefined) {
                this.handleChange(el.value);

                this.handleDropdownChange();
            }
        } else if (keyName == "esc") {
            this.handleDropdownChange();
        }

        if (keyName == "up" || keyName == "down") {
            this.dynamicList.scrollToItem(this.state.highlightedIndex);
            this.dynamicList.forceUpdate();
        }

    };

    private searchTextChanged = (e: any) => {
        let filteredOptions: IOption[];

        if (!Array.isArray(this.props.options)) {
            filteredOptions = Object.entries(this.props.options).map(([key, val]) => ({ value: key, label: val }));
        } else {
            filteredOptions = this.props.options;
        }

        if (e.target.value != "") {
            filteredOptions = filteredOptions.filter(
                (el) => ("" + el.label).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1,
            );
        }

        this.rowHeights = [];
        /*this.cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 30,
        });*/

        this.setState({
            searchedTxt: e.target.value,
            highlightedIndex: e.target.value.length > 0 ? 0 : -1,
            filteredOptions,
        });
    };

    private renderRow = React.forwardRef(({ index, style }: any, ref) => {
        const el = this.state.filteredOptions[index];

        return (
            <div
                style={style}
                // @ts-ignore
                ref={ref}
                className={
                    "w-select-item " +
                    (this.props.value == el.value || index == this.state.highlightedIndex ? "w-select-selected" : "")
                }
                onClick={(e) => {
                    this.handleChange(el.value, index);
                    this.handleDropdownChange();
                }}
            >
                {el.label}
            </div>
        );
    });

    public render() {
        const props = this.props;
        let options = props.options;
        if (!Array.isArray(props.options)) {
            options = Object.entries(props.options).map(([key, val]) => ({ value: key, label: val }));
        }
        const parsetOptions = options as IOption[];

        let selectedIndex: number = -1;

        for (let i = 0; i < parsetOptions.length; i++) {
            if (parsetOptions[i].value == props.value) {
                selectedIndex = i;
            }
        }

        if (!props.editable) {
            return (
                <div
                    className={
                        "w-field-presentation w-field-presentation-select " +
                        (selectedIndex >= 0 ? "" : "w-field-presentation-empty")
                    }
                >
                    {selectedIndex >= 0 ? parsetOptions[selectedIndex].label : ""}
                </div>
            );
        }

        return (
            <div className={"w-select"} style={props.style}>
                <div
                    className={"w-select-result-presenter"}
                    ref={(el) => (this.presenter = el)}
                    onClick={() => {
                        if (!this.state.dropdownVisible) {
                            this.handleDropdownChange();
                        }
                    }}
                >
                    {parsetOptions[selectedIndex] ? (
                        parsetOptions[selectedIndex].label
                    ) : (
                        <div className={"w-select-placeholder"}>
                            {this.props.placeholder ? this.props.placeholder : fI18n.t("frontend:fields.select.choose")}
                        </div>
                    )}
                    {props.allowClear && props.value !== null && (
                        <div className="w-select-clear" onClick={this.handleClear}>
                            <Icon name={"ChromeClose"}/>
                        </div>
                    )}
                    <Icon name={"ChevronDown"}/>
                </div>

                {this.state.dropdownVisible && (
                    <Positioner
                        relativeTo={() => this.presenter}
                        animation={"from-up"}
                        relativeSettings={{ ...RelativePositionPresets.bottomLeft, widthCalc: "same" }}
                    >
                        <div
                            className={"w-select-overlay"}
                            ref={(el) => (this.dropdown = el)}
                            tabIndex={-1}
                            onBlur={() => setTimeout(this.handleDropdownChange, 100)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <Hotkeys
                                keyName="up,down,enter,esc"
                                onKeyDown={this.onKeyDown}
                                filter={(event: any) => true}
                            >
                                {parsetOptions.length > props.minLengthToShowSearchField && props.showSearchField && (
                                    <input
                                        ref={(el) => (this.searchField = el)}
                                        type={"text"}
                                        className={"form-control"}
                                        onChange={this.searchTextChanged}
                                        value={this.state.searchedTxt}
                                    />
                                )}
                                <AutoSizer>
                                    {({ width, height }:any) => (
                                        <DynamicSizeList
                                            height={height - 35 /*- input height*/}
                                            itemCount={this.state.filteredOptions.length}
                                            width={width}
                                            ref={(el:any) => this.dynamicList = el}
                                        >
                                            {this.renderRow}
                                        </DynamicSizeList>
                                    )}
                                </AutoSizer>
                            </Hotkeys>
                        </div>
                    </Positioner>
                )}
            </div>
        );
    }
}
