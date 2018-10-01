import * as React from "react";
import Icon from "../Icon";

import Hotkeys from "react-hot-keys";

import { Positioner, RelativePositionPresets } from "../overlays/Positioner";

import "./Select.sass";
import i18n from "../../utils/I18n";

interface ISelectChangeEvent extends IFieldChangeEvent {
    selectedIndex: number;
}
interface ISelectProps extends IFieldProps {
    options: IOption[] | { [key: string]: string };
    onChange?: (changeData: ISelectChangeEvent) => any;
    allowClear?: boolean;
    value: string | number;
    disabledClass?: string;
}

interface ISelectState {
    filteredOptions: IOption[] | { [key: string]: string };
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
        style: {},
    };
    private dropdown: HTMLDivElement;
    private presenter: HTMLDivElement;
    private searchField: HTMLDivElement | null;

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
            filteredOptions: options,
        };
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

    public handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "select",
                value: e.target.value,
                selectedIndex: e.target.selectedIndex,
                event: e,
            });
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
                }
            },
        );
    };

    private onKeyDown = (keyName, e, handle) => {
        e.preventDefault();
        if (keyName == "up") {
            this.setState({ highlightedIndex: Math.max(0, this.state.highlightedIndex - 1) });
        } else if (keyName == "down") {
            this.setState({
                highlightedIndex: Math.min(this.state.filteredOptions.length - 1, this.state.highlightedIndex + 1),
            });
        } else if (keyName == "enter") {
            if (this.props.onChange) {
                const el = this.state.filteredOptions[this.state.highlightedIndex];
                if (el !== undefined) {
                    this.props.onChange({
                        name: this.props.name,
                        type: "select",
                        value: el.value,
                        selectedIndex: null,
                        event: e,
                    });
                    this.handleDropdownChange();
                }
            }
        }
    };

    private searchTextChanged = (e: any) => {
        let filteredOptions = this.props.options;

        if (!Array.isArray(filteredOptions)) {
            filteredOptions = Object.entries(filteredOptions).map(([key, val]) => ({ value: key, label: val }));
        }

        if (this.state.searchedTxt != "") {
            filteredOptions = filteredOptions.filter(
                (el) => el.label.toLowerCase().indexOf(this.state.searchedTxt.toLowerCase()) !== -1,
            );
        }

        this.setState({
            searchedTxt: e.target.value,
            highlightedIndex: e.target.value.length > 0 ? 0 : -1,
            filteredOptions,
        });
    };

    public render() {
        const props = this.props;
        let options = props.options;
        if (!Array.isArray(props.options)) {
            options = Object.entries(props.options).map(([key, val]) => ({ value: key, label: val }));
        }

        let selectedIndex: number = -1;

        for (const i in options) {
            if (options[i].value == props.value) {
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
                    {selectedIndex >= 0 ? options[selectedIndex].label : ""}
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
                    {options[selectedIndex] ? (
                        options[selectedIndex].label
                    ) : (
                        <div className={"w-select-placeholder"}>
                            {this.props.placeholder ? this.props.placeholder : i18n.t("frontend:fields.select.choose")}
                        </div>
                    )}
                    <Icon name={"ChevronDown"} />
                </div>

                {this.state.dropdownVisible && (
                    <Positioner
                        relativeTo={() => this.presenter}
                        animation={"from-up"}
                        relativeSettings={{ ...RelativePositionPresets.bottomLeft, theSameWidth: true }}
                        width="100%"
                    >
                        <div
                            className={"w-select-overlay"}
                            ref={(el) => (this.dropdown = el)}
                            tabIndex={-1}
                            onBlur={() => setTimeout(this.handleDropdownChange, 100)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <Hotkeys keyName="up,down,enter" onKeyDown={this.onKeyDown}>
                                {options.length > 6 && (
                                    <input
                                        ref={(el) => (this.searchField = el)}
                                        type={"text"}
                                        className={"form-control"}
                                        onChange={this.searchTextChanged}
                                        value={this.state.searchedTxt}
                                    />
                                )}
                                {this.state.filteredOptions.map((el, index) => (
                                    <div
                                        key={el.value}
                                        className={
                                            "w-select-item " +
                                            (props.value == el.value || index == this.state.highlightedIndex
                                                ? "w-select-selected"
                                                : "")
                                        }
                                        onClick={(e) => {
                                            if (this.props.onChange) {
                                                this.props.onChange({
                                                    name: this.props.name,
                                                    type: "select",
                                                    value: el.value,
                                                    selectedIndex: null,
                                                    event: e,
                                                });
                                            }
                                            this.handleDropdownChange();
                                        }}
                                    >
                                        {el.label}
                                    </div>
                                ))}
                            </Hotkeys>
                        </div>
                    </Positioner>
                )}
            </div>
        );
    }
}
