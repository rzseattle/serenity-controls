import * as React from "react";

import { IFilter } from "../filters/Intefaces";
import { Modal } from "../Modal";
import { RelativePositionPresets } from "../Positioner";
import { IColumnData, IFilterValue, IOrder } from "./Interfaces";
import { Icon } from "../Icon";
import { PrintJSON } from "../PrintJSON";
import Tooltip from "../Tooltip/Tooltip";

interface ITheadProps {
    selectable: boolean;
    columns: IColumnData[];
    order: { [index: string]: IOrder };
    filters: { [index: string]: IFilterValue };
    onCheckAllClicked: () => any;
    allChecked: boolean;
    onCellClicked: (index: number, e: React.MouseEvent) => any;
    onFilterChanged: (value: IFilterValue) => any;
}

export default class Thead extends React.PureComponent<ITheadProps, any> {
    public tooltipCleanup: any;

    constructor(props: ITheadProps) {
        super(props);
        this.tooltipCleanup = null;
    }

    /*
    public shouldComponentUpdate(nextProps, nextState) {
        return !deepIsEqual(
            [this.props.columns, this.props.filters, this.props.order, this.props.allChecked, this.props.selectable],
            [nextProps.columns, nextProps.filters, nextProps.order, nextProps.allChecked, nextProps.selectable],
        );
    }

    public handleMouseEnter(index: number, e) {
        e.stopPropagation();
            const el = this.props.columns.filter((column: IColumnData) => column !== null && column.display === true)[index];
        const node = ReactDOM.findDOMNode(this).querySelector(`th:nth-child(${index + 1})`);

        if (el.header.tooltip && this.tooltipCleanup === null) {
            this.tooltipCleanup = tooltip(el.header.tooltip, {
                target: () => node,
                offsetY: -10,
            });

    }

    public handleMouseLeave(index, e) {
        const el = this.props.columns.filter((el: IColumnData) => el !== null && el.display === true)[index];
        if (el.header.tooltip) {
            this.tooltipCleanup();
            this.tooltipCleanup = null;
        }
    }
    */
    public render() {
        return (
            <thead>
                <tr>
                    {this.props.selectable ? (
                        <th className="w-table-selection-header" onClick={this.props.onCheckAllClicked}>
                            <input type="checkbox" checked={this.props.allChecked} />
                        </th>
                    ) : null}
                    {this.props.columns.filter((el) => el !== null && el.display === true).map((column, index) => {
                        const Component = column.filter.length > 0 ? withFilterOpenLayer(column.filter) : null;
                        const classes = [];
                        if (this.props.order[column.field] !== undefined) {
                            classes.push("w-table-sorted w-table-sorted-" + this.props.order[column.field].dir);
                        }
                        if (this.props.filters[column.field] !== undefined) {
                            classes.push("w-table-filtered");
                        }
                        return (
                            <th
                                key={index}
                                style={{ width: column.width }}
                                className={classes.join(" ")}
                                onClick={(e) => {
                                    if (column.isSortable) {
                                        this.props.onCellClicked(index, e);
                                    }
                                }}
                                /*onMouseEnter={this.handleMouseEnter.bind(this, index)}*/
                                /*onMouseLeave={this.handleMouseLeave.bind(this, index)}*/
                            >
                                {/*{el.order ? <i className={'fa fa-' + (el.order == 'asc' ? 'arrow-down' : 'arrow-up')}></i> : ''}*/}
                                {column.header.icon && <Icon name={column.header.icon} />}

                                {column.header.tooltip ? (
                                    <Tooltip relativeSettings={RelativePositionPresets.topLeft} content={column.header.tooltip}>{column.caption}</Tooltip>
                                ) : (
                                    column.caption
                                )}
                                {column.filter.length > 0 && (
                                    <Component showApply={true} onApply={this.props.onFilterChanged} />
                                )}
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    }
}

const withFilterOpenLayer = (filters: IFilter[]) => {
    return class FilterOpenableContainer extends React.PureComponent<any, any> {
        public container: HTMLDivElement;
        public body: HTMLDivElement;
        public hideTimeout: any;

        public triggerRef = React.createRef<HTMLDivElement>();

        constructor(props: any) {
            super(props);
            this.state = {
                show: false,
            };

            this.hideTimeout = null;
        }

        public componentDidUpdate(nextProps: any, nextState: any) {
            if (this.state.show == true) {
                const data = this.body.getBoundingClientRect();
                if (data.right > window.innerWidth) {
                    this.body.style.right = "0px";
                }
            }
            return true;
        }

        public handleTriggerClicked = (e: React.MouseEvent) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            this.setState({ show: !this.state.show });
        };

        public render() {
            const additionalHack = {
                tabIndex: 0,
            };
            return (
                <div
                    className={"w-filter-openable " + (this.state.show ? "w-filter-openable-opened " : "")}
                    ref={(el) => (this.container = el)}
                    {...additionalHack}
                >
                    <div
                        className="w-filter-openable-trigger"
                        onClick={this.handleTriggerClicked}
                        ref={this.triggerRef}
                    >
                        <i className="ms-Icon ms-Icon--Filter" />
                    </div>

                    {this.state.show && (
                        <Modal
                            show={true}
                            onHide={() => this.setState({ show: false })}
                            target={() => this.triggerRef.current}
                            animation={"from-up"}
                            shadow={false}
                            relativePositionConf={RelativePositionPresets.bottomRight}
                            className={"filter-modal"}
                            {...filters[0].config.modalProps}
                        >
                            <div
                                className={
                                    "w-filter-openable-body " +
                                    (filters.length >= 3 ? "w-filter-openable-body-grid" : "")
                                }
                                ref={(el) => (this.body = el)}
                            >
                                {filters.map((entry, index) => {
                                    const Filter = entry.component;
                                    if (entry.config !== undefined) {
                                        entry.config.disableAutoFocus = index > 0;
                                    } else {
                                        entry.config = { disableAutoFocus: index > 0 };
                                    }
                                    return (
                                        <div key={entry.field}>
                                            <Filter
                                                caption={entry.caption}
                                                showApply={true}
                                                field={entry.field}
                                                onApply={this.props.onApply}
                                                config={entry.config}
                                                container={this.container}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </Modal>
                    )}
                </div>
            );
        }
    };
};
