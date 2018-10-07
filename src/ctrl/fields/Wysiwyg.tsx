import { IFieldProps } from "./Interfaces";
import * as React from "react";

const CKEDITOR: any = undefined;

export interface IWysiwygProps extends IFieldProps {
    onLoad?: () => any;
    value?: string;
}

export class Wysiwyg extends React.Component<IWysiwygProps, any> {
    public static defaultProps: Partial<IWysiwygProps> = {
        value: "",
        editable: true,
        style: {},
    };
    private id: string;

    constructor(props: IWysiwygProps) {
        super(props);
        this.id = "fields-wysiwyg-" + (Math.random() * 10000000).toFixed(0);
        this.state = {
            libsLoaded: false,
        };
    }

    public handleOnChange(value: string, event: any) {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: "wysiwyg",
                value,
                event,
            });
        }
    }

    public handleOnLoad() {
        CKEDITOR.instances[this.id].setData(this.props.value);

        // just textarea replacement making value of editor and value of form not equal
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    public initializeEditor() {
        // @ts-ignore
        Promise.all([import("scriptjs")]).then((imported) => {
            imported[0].default("https://cdn.ckeditor.com/4.7.3/full/ckeditor.js", () => {
                this.setState({ libsLoaded: true });
                const config: any = {
                    toolbar: [
                        { name: "clipboard", items: ["Undo", "Redo"] },
                        { name: "styles", items: ["Format"] },
                        {
                            name: "basicstyles",
                            items: [
                                "Bold",
                                "Italic",
                                "Underline",
                                "Strike",
                                "Subscript",
                                "Superscript",
                                "RemoveFormat",
                            ],
                        },
                        // {name: 'colors', items: ['TextColor', 'BGColor']},
                        { name: "align", items: ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"] },
                        {
                            name: "paragraph",
                            items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent", "-", "Blockquote"],
                        },
                        "/",
                        { name: "styles", items: ["HorizontalRule"] },
                        { name: "links", items: ["Link", "Unlink"] },
                        { name: "insert", items: ["Image", "Table"] },
                        { name: "tools", items: ["Maximize", "Source"] },
                    ],
                    extraPlugins: "justify",
                    enterMode: CKEDITOR.ENTER_P,
                };
                if (this.props.style.height) {
                    config.height = this.props.style.height;
                }

                config.allowedContent = true;
                config.extraAllowedContent = "iframe[*]";

                CKEDITOR.replace(this.id, config);
                config.width = 500;

                CKEDITOR.instances[this.id].on("change", (e: any) => {
                    const data = CKEDITOR.instances[this.id].getData();
                    if (data != this.props.value && this.isInputTextChanged(this.props.value)) {
                        this.handleOnChange(data, e);
                    }
                });

                CKEDITOR.instances[this.id].on("instanceReady", () => this.handleOnLoad());
            });
        });
    }

    public isInputTextChanged(input: string) {
        const data = CKEDITOR.instances[this.id].getData();

        if (input == null) {
            return data != "";
        }
        if (data != input.replace(/\r\n/g, "\n")) {
            return true;
        }

        return false;
    }

    public componentDidMount() {
        if (this.props.editable) {
            this.initializeEditor();
        }
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.editable == false && this.props.editable == true) {
            this.initializeEditor();
        }
        if (prevProps.editable == true && this.props.editable == false) {
            CKEDITOR.instances[this.id].destroy();
        }
    }

    public componentWillReceiveProps(nextProps: IWysiwygProps, currentProps: IWysiwygProps) {
        if (
            typeof CKEDITOR != "undefined" &&
            CKEDITOR.instances[this.id] != undefined &&
            nextProps.value &&
            nextProps.value != CKEDITOR.instances[this.id].getData() &&
            this.isInputTextChanged(nextProps.value)
        ) {
            CKEDITOR.instances[this.id].setData(nextProps.value);
        }
    }

    public componentWillUnmount() {
        if (typeof CKEDITOR != "undefined") {
            if (CKEDITOR.instances[this.id] != undefined) {
                CKEDITOR.instances[this.id].destroy();
            }
        }
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

        if (this.state.libsLoaded == false) {
            return (
                <div className={"w-filter w-filter-date"}>
                    <div>
                        <i className="fa fa-cog fa-spin" />
                    </div>
                </div>
            );
        }

        return (
            <textarea
                id={this.id}
                className={props.className}
                name={props.name}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
                onChange={() => true}
            />
        );
    }
}
