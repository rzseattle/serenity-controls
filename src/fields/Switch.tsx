import { IFieldProps, IOption } from "./Interfaces";
import React from "react";
import "./Switch.sass";
import { toOptions } from "./Utils";

export interface ISwitchProps extends IFieldProps {
    options: IOption[] | { [key: string]: string };
    value?: number | string;
    autoFocus: boolean;
}

export class Switch extends React.Component<ISwitchProps> {
    public static defaultProps: Partial<ISwitchProps> = {
        editable: true,
        autoFocus: false,
    };

    constructor(props: ISwitchProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public handleOnChange = (value: string | number, event: React.MouseEvent) => {
        this.setState({ value });

        // this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "switch",
                value,
                event,
            });
        }
    };

    public render() {
        const props = this.props;

        const options = toOptions(props.options);

        if (!props.editable) {
            for (const i in options) {
                if (options[i].value == props.value) {
                    return (
                        <div className={"w-field-presentation w-field-presentation-switch " + props.disabledClass}>
                            {options[i].label}
                        </div>
                    );
                }
            }
            return (
                <div
                    className={
                        "w-field-presentation w-field-presentation-switch " +
                        (props.value ? "" : "w-field-presentation-empty")
                    }
                >
                    {props.value}
                </div>
            );
        }

        const gen = (value: string | number, label: string | number) => {
            return (
                <div key={value}>
                    <div
                        className={"w-switch-label " + (props.value == value ? "w-switch-active" : "")}
                        onClick={(event) => this.handleOnChange(value, event)}
                    >
                        {label}
                    </div>
                </div>
            );
        };
        return (
            <div className="w-switch" tabIndex={-1}>
                {options.map((el) => gen(el.value, el.label))}
            </div>
        );
    }
}
