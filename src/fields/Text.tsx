import { IFieldProps } from "./Interfaces";
import * as React from "react";

export interface ITextProps extends IFieldProps {
    type?: "text" | "password";
    value?: string;
    onKeyDown?: any;
    charLimit?: any;
}

export class Text extends React.Component<ITextProps> {
    private inputRef: HTMLInputElement;

    public static defaultProps: Partial<ITextProps> = {
        value: "",
        editable: true,
        type: "text",
        autoFocus: false,
        charLimit: false,
    };

    public handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.onChange) {
            if (this.props.charLimit) {
                if (e.target.value.length <= this.props.charLimit) {
                    this.props.onChange({
                        name: this.props.name,
                        type: "text",
                        value: e.target.value,
                        event: e,
                    });
                }
            } else {
                this.props.onChange({
                    name: this.props.name,
                    type: "text",
                    value: e.target.value,
                    event: e,
                });
            }
        }
    };

    public componentDidMount() {
        // const $input_elem = ReactDOM.findDOMNode(this.refs.field);
        // Inputmask('9-a{1,3}9{1,3}').mask($input_elem);
        if (this.props.autoFocus) {
            //todo sprawdzić dlaczego potrzebny jest timeout
            setTimeout(() => {
                this.inputRef.focus();
            }, 1);
        }
    }

    public render() {
        const props = this.props;
        if (!props.editable) {
            return (
                <div
                    className={
                        "w-field-presentation w-field-presentation-text " +
                        props.disabledClass +
                        " " +
                        (props.value ? "" : "w-field-presentation-empty")
                    }
                >
                    {props.value}
                </div>
            );
        }

        return (
            <div>
                <input
                    className={props.className}
                    name={props.name}
                    type={props.type}
                    value={props.value === null ? "" : props.value}
                    onChange={this.handleOnChange}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    style={props.style}
                    autoFocus={props.autoFocus}
                    onKeyDown={props.onKeyDown}
                    ref={(el) => (this.inputRef = el)}
                />
                {props.charLimit && (
                    <div>
                        <span
                            style={{
                                color: props.charLimit - props.value.length == 0 && "red",
                                fontSize: "0.9em",
                            }}
                        >
                            Pozostało znaków: <span>{props.charLimit - props.value.length}</span>
                        </span>
                    </div>
                )}
            </div>
        );
    }
}
