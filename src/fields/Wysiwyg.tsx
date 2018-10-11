import { IFieldProps } from "./Interfaces";
import * as React from "react";

// @ts-ignore
import CKEditor from "@ckeditor/ckeditor5-react";
// @ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { LoadingIndicator } from "../LoadingIndicator";

export interface IWysiwygProps extends IFieldProps {
    onLoad?: () => any;
    value?: string;
}

export class Wysiwyg extends React.PureComponent<IWysiwygProps, any> {
    private editor: any;
    private initialValue: string;

    public static defaultProps: Partial<IWysiwygProps> = {
        editable: true,
        style: {},
        value: "",
    };

    constructor(props: IWysiwygProps) {
        super(props);

        this.state = {
            libsLoaded: false,
            value: props.value,
        };
        this.initialValue = props.value;
    }

    public handleOnChange(value: string, event: any) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "wysiwyg",
                value,
                event,
            });
        }
    }

    public componentDidUpdate(prevProps: IWysiwygProps) {
        this.setState({ value: this.props.value }, () => {
            this.editor.setData(this.props.value);
        });
    }

    public render() {
        const props = this.props;
        if (!props.editable) {
            return (
                <div
                    className="w-field-presentation w-field-presentation-wysiwyg"
                    dangerouslySetInnerHTML={{ __html: props.value }}
                />
            );
        }

        if (this.state.libsLoaded == false && false) {
            return <LoadingIndicator />;
        }

        return (
            <CKEditor
                editor={ClassicEditor}
                data={this.initialValue}
                onInit={(editor: any) => {
                    this.editor = editor;
                    editor.ui.view.editable.editableElement.style.minHeight = '300px';
                }}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    this.handleOnChange(data, event);
                }}
            />
        );
    }
}
