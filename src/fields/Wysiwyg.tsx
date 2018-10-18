import { IFieldProps } from "./Interfaces";
import * as React from "react";

// const CKEDITOR: any = undefined;

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
        const proposedValue = props.value !== null ? props.value : "";
        this.state = {
            libsLoaded: false,
            editorId: this.id,
            prevValue: proposedValue,
            value: proposedValue,
        };
    }

    public handleOnLoad() {
        // @ts-ignore
        CKEDITOR.instances[this.id].setData(this.props.value);

        // just textarea replacement making value of editor and value of form not equal
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    public shouldComponentUpdate(nextProps: IWysiwygProps, nextState: any) {
        if (nextState.libsLoaded != this.state.libsLoaded) {
            return true;
        }
        if (nextProps.editable != this.props.editable) {
            return true;
        }

        return false;
    }

    public initializeEditor() {
        // @ts-ignore
        Promise.all([import("scriptjs")]).then((imported) => {
            imported[0].default("https://cdn.ckeditor.com/4.10.1/full/ckeditor.js", () => {
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
                    // @ts-ignore
                    enterMode: CKEDITOR.ENTER_P,
                };
                if (this.props.style.height) {
                    config.height = this.props.style.height;
                }

                config.allowedContent = true;
                config.extraAllowedContent = "iframe[*]";

                // @ts-ignore
                CKEDITOR.replace(this.id, config);
                config.width = 500;

                // @ts-ignore
                CKEDITOR.instances[this.id].on("change", (e: any) => {
                    // @ts-ignore
                    const data = CKEDITOR.instances[this.id].getData();
                    this.handleOnChange(data, e);
                });

                // @ts-ignore
                CKEDITOR.instances[this.id].on("instanceReady", () => this.handleOnLoad());
            });
        });
    }

    public componentDidMount() {
        if (this.props.editable) {
            this.initializeEditor();
        }
        console.clear();
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps.editable == false && this.props.editable == true) {
            this.initializeEditor();
        }
        if (prevProps.editable == true && this.props.editable == false) {
            // @ts-ignore
            CKEDITOR.instances[this.id].destroy();
        }
    }

    public handleOnChange(value: string, event: any) {
        this.setState({ value }, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    name: this.props.name,
                    type: "wysiwyg",
                    value,
                    event,
                });
            }
        });
    }

    public static getDerivedStateFromProps(nextProps: IWysiwygProps, state: any) {
        const proposedValue = nextProps.value !== null ? nextProps.value : "";

        if (proposedValue !== state.prevValue) {
            if (proposedValue != state.value) {
                if (
                    // @ts-ignore
                    CKEDITOR.instances[state.editorId] != undefined &&
                    // @ts-ignore
                    nextProps.value != CKEDITOR.instances[state.editorId].getData()
                ) {
                    // @ts-ignore
                    CKEDITOR.instances[state.editorId].setData(nextProps.value);
                }
            }

            return {
                prevValue: proposedValue,
            };
        }
        return null;
    }

    public componentWillUnmount() {
        // @ts-ignore
        if (typeof CKEDITOR != "undefined") {
            // @ts-ignore
            if (CKEDITOR.instances[this.id] != undefined) {
                // @ts-ignore
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
            />
        );
    }
}
