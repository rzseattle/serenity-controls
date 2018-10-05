
interface ITextareaProps extends IFieldProps {
    value?: string;
}

class Textarea extends React.Component<ITextareaProps, any> {
    public static defaultProps: Partial<ITextareaProps> = {
        value: "",
        editable: true,
    };

    public handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "textarea",
                value: e.target.value,
                event: e,
            });
        }
    }

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
                onChange={this.handleOnChange.bind(this)}
                placeholder={props.placeholder}
                value={props.value === null ? "" : props.value}
                disabled={props.disabled}
                style={props.style}
            />
        );
    }
}