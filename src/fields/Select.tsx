import * as React from "react";

import { Positioner, RelativePositionPresets } from "../Positioner";
import "./Select.sass";
import { IFieldChangeEvent, IFieldProps, IOption } from "./Interfaces";
import { Icon } from "../Icon";
import { fI18n } from "../lib";
import { toOptions } from "./Utils";
import { HotKeys } from "../HotKeys";
import { Key } from "ts-key-enum";

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
    mode?: "dropdown" | "list";
    height?: number;
    autoFocus?: boolean;
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
        mode: "dropdown",
        height: 300,
    };
    private dropdown: HTMLDivElement;
    private presenter: HTMLDivElement;
    private searchField: HTMLInputElement | null;
    private cache: any;
    private listRef: HTMLDivElement;

    private rowHeights: number[] = [];

    private dynamicList: any;

    constructor(props: ISelectProps) {
        super(props);

        let options = props.options;
        if (!Array.isArray(props.options)) {
            options = Object.entries(props.options).map(([key, val]) => ({ value: key, label: val }));
        }

        this.state = {
            dropdownVisible: props.mode === "list" ? true : false,
            searchedTxt: "",
            highlightedIndex: -1,
            filteredOptions: options as IOption[],
        };
    }

    public componentDidMount() {
        // this.handleDropdownChange();

        if (this.props.autoFocus) {
            if (this.props.mode == "dropdown") {
                this.handleDropdownChange();
            } else {
                setTimeout(() => this.searchField.focus(), 10);
            }
        }
    }

    public handleDropdownChange = () => {
        const options = toOptions(this.props.options);

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
        //this.dynamicList.forceUpdate();
    };

    private handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        this.handleChange(null);
    };

    componentDidUpdate(prevProps: Readonly<ISelectProps>, prevState: Readonly<ISelectState>, snapshot?: any): void {
        if (this.listRef) {
            const highlighted = this.listRef.getElementsByClassName("w-select-highlighted")[0] as HTMLElement;
            if (highlighted) {
                const elTop = highlighted.offsetTop - 36;
                const elHeight = highlighted.getBoundingClientRect().height;
                const listHeight = this.listRef.getBoundingClientRect().height;

                if (listHeight + this.listRef.scrollTop < elTop + elHeight) {
                    this.listRef.scrollTop += elHeight;
                }

                if (this.listRef.scrollTop > elTop) {
                    this.listRef.scrollTop -= elHeight;
                }
            }
        }
    }

    private onKeyDown = (e: React.KeyboardEvent, keyName: string) => {
        e.preventDefault();
        e.stopPropagation();

        if (keyName == Key.ArrowUp) {
            this.setState({ highlightedIndex: Math.max(0, this.state.highlightedIndex - 1) });
        } else if (keyName == Key.ArrowDown) {
            this.setState({
                highlightedIndex: Math.min(this.state.filteredOptions.length - 1, this.state.highlightedIndex + 1),
            });
        } else if (keyName == Key.Enter) {
            const el = this.state.filteredOptions[this.state.highlightedIndex];
            if (el !== undefined) {
                this.handleChange(el.value);

                this.handleDropdownChange();
            }
        } else if (keyName == Key.Escape) {
            this.handleDropdownChange();
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

        this.setState(
            {
                searchedTxt: e.target.value,
                highlightedIndex: e.target.value.length > 0 ? 0 : -1,
                filteredOptions,
            },
            /*() => this.dynamicList.scrollToItem(0)*/
        );
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
                    (this.props.value == el.value ? "w-select-selected " : "") +
                    (index == this.state.highlightedIndex ? "w-select-highlighted " : "")
                }
                onClick={(e) => {
                    this.handleChange(el.value, index);
                    this.handleDropdownChange();
                }}
                onMouseEnter={() => {
                    this.setState({ highlightedIndex: index }); //() => this.dynamicList.forceUpdate()
                }}
            >
                {el.label}
            </div>
        );
    });

    private renderListBody = () => {
        const options = toOptions(this.props.options);

        const heightDiff: number =
            options.length > this.props.minLengthToShowSearchField && this.props.showSearchField ? 35 : 0;

        return (
            <HotKeys
                actions={[
                    { key: Key.ArrowUp, handler: this.onKeyDown },
                    { key: Key.ArrowDown, handler: this.onKeyDown },
                    { key: Key.Enter, handler: this.onKeyDown },
                    { key: Key.Escape, handler: this.onKeyDown },
                ]}
                captureInput={true}
            >
                {options.length > this.props.minLengthToShowSearchField && this.props.showSearchField && (
                    <input
                        ref={(el) => (this.searchField = el)}
                        type={"text"}
                        className={"form-control"}
                        onChange={this.searchTextChanged}
                        value={this.state.searchedTxt}
                    />
                )}
                {/*<AutoSizer>
                    {({ width, height }: any) => (
                        <DynamicSizeList
                            height={height - heightDiff /*- input height*!/
                            itemCount={this.state.filteredOptions.length}
                            width={width}
                            ref={(el: any) => (this.dynamicList = el)}
                        >
                            {this.renderRow}
                        </DynamicSizeList>
                    )}
                </AutoSizer>*/}

                <div style={{ height: 260, overflow: "auto", position: "relative" }} ref={(el) => (this.listRef = el)}>
                    {this.state.filteredOptions.map((el, index) => {
                        return (
                            <div
                                key={el.value}
                                className={
                                    "w-select-item " +
                                    (this.props.value == el.value ? "w-select-selected " : "") +
                                    (index == this.state.highlightedIndex ? "w-select-highlighted " : "")
                                }
                                onClick={(e) => {
                                    this.handleChange(el.value, index);
                                    this.handleDropdownChange();
                                }}
                                onMouseEnter={() => {
                                    this.setState({ highlightedIndex: index }); //, () => this.dynamicList.forceUpdate()
                                }}
                            >
                                {el.label}
                            </div>
                        );
                    })}
                </div>
            </HotKeys>
        );
    };

    public render() {
        const props = this.props;
        const options = toOptions(this.props.options);

        let selectedIndex: number = -1;

        for (let i = 0; i < options.length; i++) {
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
            <div
                className={"w-select"}
                style={props.style}
                onMouseLeave={() => {
                    this.setState({ highlightedIndex: -1 }, () =>
                        this.dynamicList ? this.dynamicList.forceUpdate() : null,
                    );
                }}
            >
                {this.props.mode === "dropdown" && (
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
                                {this.props.placeholder
                                    ? this.props.placeholder
                                    : fI18n.t("frontend:fields.select.choose")}
                            </div>
                        )}
                        {props.allowClear && props.value !== null && (
                            <div className="w-select-clear" onClick={this.handleClear}>
                                <Icon name={"ChromeClose"} />
                            </div>
                        )}
                        <Icon name={"ChevronDown"} />
                    </div>
                )}
                {this.state.dropdownVisible && props.mode === "dropdown" && (
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
                            // style={{ height: options.length * 78, maxHeight: this.props.height }}
                        >
                            {this.renderListBody()}
                        </div>
                    </Positioner>
                )}
                {props.mode === "list" && (
                    <div
                        className="w-select-list"
                        ref={(el) => (this.dropdown = el)}
                        tabIndex={-1}
                        style={{ height: options.length * 28, maxHeight: this.props.height }}
                    >
                        {this.renderListBody()}
                    </div>
                )}
            </div>
        );
    }
}
