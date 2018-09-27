import * as React from "react";

import { IFieldChangeEvent, IFieldProps } from "../../fields/Interfaces";

import { LoadingIndicator } from "../../LoadingIndicator";
import { deepIsEqual } from "../../../lib/JSONTools";
import i18n from "../../../utils/I18n";
import { Trans } from "react-i18next";
import IConnectionElement from "./IConnectionElement";
import ConnectionsFieldSelectionElement from "./ConnectionsFieldSelectionElement";
import { ConnectionsFieldEntry } from "./ConnectionsFieldEntry";
import PrintJSON from "../../../utils/PrintJSON";

import { Positioner, RelativePositionPresets } from "../../overlays/Positioner";

export interface IConnectionChangeEvent extends IFieldChangeEvent {
    items: IConnectionElement[];
}

export interface IConnectionFieldInput {
    searchString: string;
    selected: string[] | number[];
    requestType: "search" | "getItems";
}

export interface IConnectionsFieldProps extends IFieldProps {
    /**
     * Value of the field. Arry if maxItems > 1, string | number if maxItems == 1
     */
    value: string[] | number[];
    /**
     * Maximum items selected from list
     */
    maxItems?: number;
    /**
     * Items loaded on init of the  field  ( selected items )
     */
    items?: IConnectionElement[];
    /**
     * Search result provider
     * input.requestType = "search"
     */
    searchResultProvider: (input: IConnectionFieldInput) => Promise<IConnectionElement[]>;

    /**
     * Using search provider to fill field by items attached to values
     * input.requestType = "getItems"
     */
    fillItems: boolean;

    /**
     * Template applied to selection list
     */
    itemTemplate?: (element: IConnectionElement) => any;

    /**
     * Template applied to selection list
     */
    selectionTemplate?: (element: IConnectionElement) => any;
    /**
     * Placeholder
     */
    placeholder?: string;

    /**
     * Vertical elements presentation
     */
    verticalDisplay?: boolean;

    /**
     * onChange event
     */
    onChange?: (changeData: IConnectionChangeEvent) => any;

    /**
     *  Prints data information under field
     */
    debug?: boolean;

    /**
     * If true opening search box without any phrase entered
     */
    searchWithoutPhrase: boolean;

    /**
     * If item is clicked
     */

    onItemClick?: (element: IConnectionElement) => any;
}

interface IConnectionsFieldState {
    selectionOpened: boolean;
    selectedIndex: number;
    search: string;
    searchResult: IConnectionElement[];
    loading: boolean;
    items: IConnectionElement[];
    props: IConnectionsFieldProps;
    itemsLoading: boolean;
}

export class ConnectionsField extends React.Component<IConnectionsFieldProps, IConnectionsFieldState> {
    public static defaultProps: Partial<IConnectionsFieldProps> = {
        maxItems: 10000,
        items: [],
        value: [],
        editable: true,
        verticalDisplay: false,
        fillItems: false,
        debug: false,
        searchWithoutPhrase: false,
    };

    private input: HTMLInputElement;
    private inputContainer = React.createRef<HTMLDivElement>();
    //private inputContainer: any;

    constructor(props: IConnectionsFieldProps) {
        super(props);
        this.state = {
            selectionOpened: false,
            selectedIndex: 0,
            search: "",
            searchResult: [],
            loading: false,
            items: props.items !== null ? props.items : [],
            props: this.props,
            itemsLoading: false,
        };
    }

    public componentDidMount(): void {
        if (this.props.value.length > 0 && this.props.fillItems) {
            this.setState({ itemsLoading: true }, () => {
                this.props
                    .searchResultProvider({
                        searchString: "",
                        selected: this.props.value,
                        requestType: "getItems",
                    })
                    .then((result) => {
                        this.setState({
                            items: result,
                            itemsLoading: false,
                        });
                    });
            });
        }
    }

    public static getDerivedStateFromProps(props: IConnectionsFieldProps, state: any) {
        let ret = {};

        if (!deepIsEqual(props.items, state.props.items)) {
            ret = {
                items: props.items,
            };
        }

        if (!deepIsEqual(props.value, state.props.value)) {
            ret = {
                ...ret,
                value: props.value,
            };
        }

        if (Object.entries(ret).length > 0) {
            return { ...ret, props };
        }

        return null;
    }

    public handleInputFocus = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({ selectionOpened: true, selectedIndex: -1 });
        if (this.props.searchWithoutPhrase) {
            this.handleInputChange(e);
        }
    };

    public handleInputBlur = () => {
        this.setState({ selectionOpened: false, search: "" });
    };

    public handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        this.setState({
            search: value,
            searchResult: [],
        });

        if (value.length > 0 || this.props.searchWithoutPhrase) {
            this.setState({
                loading: true,
            });
            this.props
                .searchResultProvider({
                    searchString: value,
                    selected: this.props.maxItems == 1 ? [] : this.getValues(),
                    requestType: "search",
                })
                .then((result) => {
                    this.setState({
                        loading: false,
                        selectedIndex: 0,
                        searchResult: result,
                    });
                });
        }
    };

    public getItems() {
        return this.state.items;
    }

    public getValues(): string[] | number[] {
        return this.state.items.reduce((p, c) => p.concat(c.value), []);
    }

    public handleOnChange = () => {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "ConnectionField",
                value: this.getValues(),
                event: null,
                items: this.getItems(),
                data: {},
            });
        }
    };

    public handleSelection(el: IConnectionElement) {
        if (el) {
            this.setState(
                {
                    items: [...this.state.items, el],
                    search: "",
                },
                this.handleOnChange,
            );
        }
    }

    public handleSelectionChange = (index: number) => {
        this.setState({ selectedIndex: index });
    };

    public handleSelectionClick = (index: number, el: IConnectionElement) => {
        this.handleSelection(el);
    };

    public handleElementDelete = (value: string | number) => {
        const filtered = this.state.items.filter((el) => el.value != value);
        this.setState(
            {
                items: filtered,
            },
            () => {
                this.handleOnChange();
            },
        );
    };

    public handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.stopPropagation();

        e.nativeEvent.stopImmediatePropagation();

        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();
            const changed = this.state.selectedIndex + (e.keyCode == 38 ? -1 : 1);
            if (changed >= 0 && changed < this.state.searchResult.length) {
                this.setState({ selectedIndex: changed });
            }
        }
        if (e.keyCode == 13) {
            this.handleSelection(this.state.searchResult[this.state.selectedIndex]);
            e.preventDefault();
        }

        // usuwanie ostatniego brzez delete
        if (e.keyCode == 8 && e.currentTarget.value == "") {
            if (this.state.items.length > 0) {
                this.handleElementDelete(this.state.items[this.state.items.length - 1].value);
            }
        }
    };

    public render() {
        return (
            <>
                <div
                    className={
                        "w-connections-field" +
                        (this.props.verticalDisplay ? " w-connections-field-vertical-display" : "") +
                        (this.props.editable ? "" : " w-connections-field-presenter") +
                        (this.state.items.length == 0 ? " w-connections-field-presenter-empty" : "")
                    }
                    ref={this.inputContainer}
                >
                    {this.state.items.map((el: any) => (
                        <ConnectionsFieldEntry
                            key={el.value}
                            item={el}
                            onClick={this.props.onItemClick}
                            onDelete={this.handleElementDelete}
                            template={this.props.itemTemplate}
                        />
                    ))}

                    {!this.props.editable && this.state.items.length == 0 && <Trans i18nKey="frontend:noConnections" />}
                    {this.state.itemsLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <div
                            className="w-connections-field-input"
                            style={{ display: this.state.items.length < this.props.maxItems ? "block" : "none" }}
                        >
                            <input
                                type="text"
                                ref={(el) => (this.input = el)}
                                onFocus={this.handleInputFocus}
                                onBlur={this.handleInputBlur}
                                onKeyDown={this.handleInputKeyDown}
                                placeholder={this.props.placeholder ? this.props.placeholder : i18n.t("frontend:add")}
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    )}

                    {this.state.selectionOpened &&
                        (this.state.search.length > 0 || this.props.searchWithoutPhrase) && (
                            <Positioner
                                relativeTo={() => this.inputContainer.current}
                                relativeSettings={{ ...RelativePositionPresets.bottomMiddle, theSameWidth: true }}
                            >
                                <div className="w-connections-field-results">
                                    {/*To jest test modala {this.state.selectedIndex}*/}
                                    {this.state.loading && <LoadingIndicator />}
                                    {!this.state.loading &&
                                        this.state.searchResult.length == 0 && <div>Brak wyników</div>}
                                    {!this.state.loading && (
                                        <ConnectionsFieldSelectionElement
                                            items={this.state.searchResult}
                                            selectedIndex={this.state.selectedIndex}
                                            selectionChange={this.handleSelectionChange}
                                            elementClicked={this.handleSelectionClick}
                                            elementTemplate={this.props.selectionTemplate}
                                        />
                                    )}
                                </div>
                            </Positioner>
                        )}
                </div>
                {this.props.debug && (
                    <div>
                        <PrintJSON json={{ value: this.getValues(), items: this.state.items }} />
                    </div>
                )}
            </>
        );
    }
}
