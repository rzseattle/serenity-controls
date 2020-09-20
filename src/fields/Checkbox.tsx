import { IFieldChangeEvent, IFieldProps, IOption } from "./Interfaces";
import React from "react";

import "./Checkbox.sass";
import { Icon } from "../Icon";

export interface ICheckboxProps extends IFieldProps {
    value?: any;
    checked?: boolean;
    label?: string;
}

interface IChecboxChangeEvent extends IFieldChangeEvent {
    data: {
        checked: boolean;
    };
}

interface IChecboxState {
    checked: boolean;
    lastChecked: boolean;
}

export class Checkbox extends React.Component<ICheckboxProps, IChecboxState> {
    public static defaultProps: Partial<ICheckboxProps> = {
        editable: true,
        checked: false,
        label: "",
    };

    constructor(props: ICheckboxProps) {
        super(props);
        this.state = {
            checked: props.checked,
            lastChecked: props.checked,
        };
    }

    public static getDerivedStateFromProps(props: ICheckboxProps, state: IChecboxState): any {
        if (props.checked != state.lastChecked) {
            return {
                checked: props.checked,
                lastChecked: props.checked,
            };
        }
        return null;
    }

    public handleOnChange = (event: React.MouseEvent) => {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    type: "checkbox",
                    value: this.props.value,
                    event,
                    data: {
                        checked: this.state.checked,
                    },
                } as IChecboxChangeEvent);
            }
        });
    };

    public render() {
        const props = this.props;

        if (!props.editable) {
            return (
                <div className="w-checkbox">
                    <div className="w-field-presentation w-field-presentation-checkbox ">
                        <Icon name={props.checked ? "CheckMark" : "ChromeClose"} />
                    </div>
                </div>
            );
        }

        return (
            <div className="w-checkbox">
                <label onClick={this.handleOnChange}>
                    <div className={"w-checkbox-element " + (this.state.checked && "w-checkbox-element-selected")} />
                    {this.props.label !== "" && <span>{this.props.label}</span>}
                </label>
            </div>
        );
    }
}
