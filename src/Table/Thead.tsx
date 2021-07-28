import * as React from "react";

import { IFilter } from "../filters/Intefaces";
import { Modal } from "../Modal";
import { RelativePositionPresets } from "../Positioner";
import { IColumnData, IFilterValue, IOrder } from "./Interfaces";
import { Icon } from "../Icon";
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

export default React.memo((props: ITheadProps) => {
    return (
        <thead>
            <tr>
                {props.selectable ? (
                    <th className="w-table-selection-header" onClick={props.onCheckAllClicked}>
                        <input type="checkbox" checked={props.allChecked} />
                    </th>
                ) : null}
                {props.columns
                    .filter((el) => el !== null && el.display === true)
                    .map((column, index) => {
                        const Component = column.filter.length > 0 ? withFilterOpenLayer(column.filter) : null;
                        const classes = [];
                        if (props.order[column.field] !== undefined) {
                            classes.push("w-table-sorted w-table-sorted-" + props.order[column.field].dir);
                        }
                        if (props.filters[column.field] !== undefined) {
                            classes.push("w-table-filtered");
                        }
                        return (
                            <th
                                key={index}
                                style={{ width: column.width }}
                                className={classes.join(" ")}
                                onClick={(e) => {
                                    if (column.events.headerClick.length > 0) {
                                        column.events.headerClick.map((callback) => {
                                            callback.bind(this)(column, this, e);
                                        });
                                    }
                                    if (column.isSortable) {
                                        props.onCellClicked(index, e);
                                    }
                                }}
                                /*onMouseEnter={this.handleMouseEnter.bind(this, index)}*/
                                /*onMouseLeave={this.handleMouseLeave.bind(this, index)}*/
                            >
                                {/*{el.order ? <i className={'fa fa-' + (el.order == 'asc' ? 'arrow-down' : 'arrow-up')}></i> : ''}*/}

                                {column.header.tooltip ? (
                                    <Tooltip
                                        relativeSettings={RelativePositionPresets.topMiddle}
                                        content={column.header.tooltip}
                                    >
                                        {column.header.icon && <Icon name={column.header.icon} />} {column.caption}
                                    </Tooltip>
                                ) : (
                                    <>
                                        {column.header.icon && <Icon name={column.header.icon} />} {column.caption}
                                    </>
                                )}
                                {column.filter.length > 0 && (
                                    <Component showApply={true} onApply={props.onFilterChanged} />
                                )}
                            </th>
                        );
                    })}
            </tr>
        </thead>
    );
});

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
                            {...(filters[0].config ? filters[0].config.modalProps : {})}
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
