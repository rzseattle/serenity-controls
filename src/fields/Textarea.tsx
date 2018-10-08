import { IFieldProps } from "./Interfaces";
import * as React from "react";

export interface ITextareaProps extends IFieldProps {
    value?: string;
}

export class Textarea extends React.PureComponent<ITextareaProps> {
    public static defaultProps: Partial<ITextareaProps> = {
        value: "",
        editable: true,
    };

    public handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "textarea",
                value: e.target.value,
                event: e,
            });
        }
    };

    public render() {
        const props = this.props;
        if (!props.editable) {
            return (
                <div className={"w-field-presentation w-field-presentation-textarea " + props.disabledClass}>
                    {props.value}
                </div>
            );
        }
        return (
            <textarea
                className={props.className}
                name={props.name}
                onChange={this.handleOnChange}
                placeholder={props.placeholder}
                value={props.value === null ? "" : props.value}
                disabled={props.disabled}
                style={props.style}
            />
        );
    }
}
