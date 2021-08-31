import { checkIncludes, toOptions } from "./Utils";
import { IFieldProps, IOption } from "./Interfaces";
import React, { ReactElement, StatelessComponent } from "react";
import { Checkbox } from "./Checkbox";
import "./CheckboxGroup.sass";
import { deepCopy, deepIsEqual, fI18n } from "../lib";
import { nanoid } from "nanoid";

export interface ICheckboxGroupProps extends IFieldProps {
    options: IOption[] | { [key: string]: string };
    value: string[] | number[];
    columns?: "none" | "horizontal" | "vertical";
    columnsCount?: number;
    selectTools?: boolean;
    groupBy?: IGroupByData;
}
export interface IGroupByData {
    field?: string;
    equalizer?: (prevRow: any, nextRow: any) => boolean;
    labelProvider?: (nextRow: any, prevRow: any) => string | ReactElement<any> | StatelessComponent;
}

export class CheckboxGroup extends React.Component<ICheckboxGroupProps, any> {
    public static defaultProps: Partial<ICheckboxGroupProps> = {
        value: [],
        editable: true,
        columns: "none",
        columnsCount: 4,
        selectTools: false,
    };

    public shouldComponentUpdate(
        nextProps: Readonly<ICheckboxGroupProps>,
        nextState: Readonly<any>,
        nextContext: any,
    ): boolean {
        return !deepIsEqual(
            [
                this.props.value,
                this.props.options,
                this.props.columns,
                this.props.columnsCount,
                this.props.selectTools,
                this.props.editable,
            ],
            [
                nextProps.value,
                nextProps.options,
                nextProps.columns,
                nextProps.columnsCount,
                nextProps.selectTools,
                nextProps.editable,
            ],
        );
    }

    public fireOnChangeExternal(values: any[]) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "checkboxgroup",
                value: values,
                event: null,
            });
        }
    }

    public handleOnChange = (value: string | number, on: boolean) => {

        let values = this.props.value;
        if (on) {
            (values as string[]).push(value as string);
        } else {
            values = (values as string[]).filter((element: string | number) => element != value);
        }

        this.fireOnChangeExternal(values);
    };

    public selectAll = () => {
        const options = toOptions(this.props.options);
        const values = options.map((el) => el.value);

        this.fireOnChangeExternal(values);
    };

    public deselectAll = () => {
        this.fireOnChangeExternal([]);
    };

    public groupByGetInfo = (row1: any, row2: any) => {
        const info = [];
        const group = this.props.groupBy;

        if (group.field !== undefined) {
            if (row1 === null || row1[group.field] != row2[group.field]) {
                info.push({ label: row2[group.field] });
            }
        } else if (group.equalizer !== undefined) {
            if (row1 === null || group.equalizer(row1, row2)) {
                info.push({ label: group.labelProvider(row2, row1) });
            }
        }

        return info;
    };

    public render() {
        const props = this.props;

        const options = toOptions(props.options);

        if (!props.editable) {
            const elements = [];

            for (const i in props.value) {
                const element = options.filter((v) => {
                    return v.value == props.value[i];
                });
                elements.push(<li key={element[0].value}>{element[0].label}</li>);
            }

            if (elements.length > 0) {
                return <ul className="w-field-presentation w-field-presentation-checkboxgroup">{elements}</ul>;
            }

            return (
                <div className="w-field-presentation w-field-presentation-checkboxgroup">{props.value.join(",")}</div>
            );
        }

        const columnWidth: React.CSSProperties =
            props.columns != "none" ? { width: 100 / props.columnsCount + "%" } : {};

        const columDivider = Math.ceil(options.length / props.columnsCount);

        const gen = (value: string | number, label: string | number) => {
            const field = (
                <Checkbox
                    checked={checkIncludes(props.value, value)}
                    value={value}
                    label={label as string}
                    onChange={(ev) => {
                        this.handleOnChange(value, ev.data.checked);
                    }}
                />
            );

            return <div style={props.columns == "horizontal" ? columnWidth : {}}>{field}</div>;
        };

        return (
            <div className="w-checkboxgroup">
                <div
                    className={
                        "w-checkboxgroup-container" + (props.columns != "none" && " w-checkboxgroup-container-inline")
                    }
                >
                    {props.columns != "vertical" &&
                        options.map((item: IOption, index) => {
                            let groupInfo = null;
                            if (this.props.groupBy !== undefined) {
                                const groupData = this.groupByGetInfo(options[index - 1] ?? null, item);
                                if (groupData.length > 0) {
                                    groupInfo = (
                                        <div className="w-checkboxgroup-group-label">
                                            {groupData.map((el) => (
                                                <React.Fragment key={nanoid()}>{el.label}</React.Fragment>
                                            ))}
                                        </div>
                                    );
                                }
                            }
                            return (
                                <>
                                    {groupInfo ? groupInfo : null}
                                    {gen(item.value, item.label)}
                                </>
                            );
                        })}

                    {props.columns == "vertical" &&
                        Array.from({ length: props.columnsCount }, (v, k) => k).map((el) => {
                            // if (this.props.groupBy !== null) {
                            //     const groupData = this.groupByGetInfo(lastRow, item);
                            //     if (groupData.length > 0) {
                            //
                            //     }
                            // }

                            return (
                                <div key={el} style={columnWidth}>
                                    {options
                                        .slice(el * columDivider, columDivider * (el + 1))
                                        .map((item: IOption, index) => {
                                            return <>{gen(item.value, item.label)}</>;
                                        })}
                                </div>
                            );
                        })}
                </div>

                {props.selectTools && (
                    <div className="w-checkboxgroup-tools">
                        <hr />
                        <a onClick={this.selectAll}>{fI18n.t("frontend:fields.checkboxgroup.selectAll")}</a> |
                        <a onClick={this.deselectAll}>{fI18n.t("frontend:fields.checkboxgroup.deselectAll")}</a>
                    </div>
                )}
            </div>
        );
    }
}
