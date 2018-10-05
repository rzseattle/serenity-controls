import { IFieldProps, IOption } from "./Interfaces";
import React from "react";

interface ISwitchProps extends IFieldProps {
    options: IOption[] | { [key: string]: string };
    value?: number | string;
}

export default class Switch extends React.Component<ISwitchProps> {
    public static defaultProps: Partial<ISwitchProps> = {
        editable: true,
    };

    constructor(props: ISwitchProps) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    public handleOnChange(value, event) {
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
    }

    public render() {
        const props = this.props;

        if (!props.editable) {
            if (Array.isArray(props.options)) {
                for (const i in props.options) {
                    if (props.options[i].value == props.value) {
                        return (
                            <div className={"w-field-presentation w-field-presentation-switch " + props.disabledClass}>
                                {props.options[i].label}
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
            } else {
                return (
                    <div
                        className={
                            "w-field-presentation w-field-presentation-switch " +
                            (props.options[props.value] ? "" : "w-field-presentation-empty")
                        }
                    >
                        {props.options[props.value]}
                    </div>
                );
            }
        }

        const gen = (value, label) => {
            return (
                <div key={value}>
                    <div
                        className={"w-switch-label " + (props.value == value ? "w-switch-active" : "")}
                        onClick={this.handleOnChange.bind(this, value)}
                    >
                        {label}
                    </div>
                </div>
            );
        };
        return (
            <div className="w-switch">
                {Array.isArray(props.options)
                    ? props.options.map((el) => gen(el.value, el.label))
                    : Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        );
    }
}
