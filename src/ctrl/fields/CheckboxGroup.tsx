import { checkIncludes } from "./Utils";
import { IFieldProps } from "./Interfaces";
import React from "react";

interface ICheckboxGroupProps extends IFieldProps {
    options: Array<{ value: string | number; label: string }> | { [key: string]: string };
    value: string[];
    inline: boolean;
}

export class CheckboxGroup extends React.Component<ICheckboxGroupProps, any> {
    public static defaultProps: Partial<ICheckboxGroupProps> = {
        value: [],
        editable: true,
    };

    constructor(props: ICheckboxGroupProps) {
        super(props);
        this.state = {};
    }

    public handleOnChange = (e) => {
        let value: string[] = this.props.value ? this.props.value.slice(0) : [];
        if (e.target.checked) {
            value.push(e.target.value);
        } else {
            value = value.filter((el) => el != e.target.value);
        }

        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "checkboxgroup",
                value,
                event: e,
            });
        }
    };

    public render() {
        const props = this.props;
        if (!props.editable) {
            if (Array.isArray(props.options)) {
                const elements = [];

                for (const i in props.value) {
                    const element = props.options.filter(function(v, index) {
                        return v.value == props.value[i];
                    });
                    elements.push(<li key={element[0].value}>{element[0].label}</li>);
                }

                if (elements.length > 0) {
                    return <ul className="w-field-presentation w-field-presentation-checkboxgroup">{elements}</ul>;
                }

                return (
                    <div className="w-field-presentation w-field-presentation-checkboxgroup">
                        {props.value.join(",")}
                    </div>
                );
            } else {
                return (
                    <ul className="w-field-presentation w-field-presentation-checkboxgroup">
                        {/*{props.value.map(val => <li key={val}>{props.options[val]}</li>)}*/}
                        TODO
                    </ul>
                );
            }
        }

        const gen = (value, label) => {
            const field = (
                <input
                    type="checkbox"
                    name={props.name}
                    value={value}
                    checked={props.value && checkIncludes(props.value, value)}
                    onChange={this.handleOnChange}
                    disabled={props.disabled}
                />
            );
            if (props.inline == true) {
                return (
                    <label className="checkbox-inline" key={value}>
                        {" "}
                        {field}
                        {label}
                    </label>
                );
            } else {
                return (
                    <div className="checkbox" key={value}>
                        <label>
                            {field} {label}
                        </label>
                    </div>
                );
            }
        };
        return (
            <div>
                {Array.isArray(props.options)
                    ? props.options.map((el) => gen(el.value, el.label))
                    : Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        );
    }
}
