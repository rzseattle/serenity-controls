import { IFieldProps } from "./Interfaces";
import * as React from "react";
import "./Wysiwyg.sass";
// @ts-ignore
import { EditorState, convertToRaw, ContentState } from "draft-js";
// @ts-ignore
import { Editor } from "react-draft-wysiwyg";
// @ts-ignore
import draftToHtml from "draftjs-to-html";
// @ts-ignore
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { LoadingIndicator } from "../LoadingIndicator";

export interface IWysiwygProps extends IFieldProps {
    onLoad?: () => any;
    value?: string;
}

export class Wysiwyg extends React.Component<IWysiwygProps, any> {
    public static defaultProps: Partial<IWysiwygProps> = {
        editable: true,
        style: {},
        value: "",
    };

    constructor(props: IWysiwygProps) {
        super(props);
        const proposedValue = props.value !== null ? props.value : "";
        const html = proposedValue;
        const contentBlock = htmlToDraft(html);
        let editorState = EditorState.createEmpty();

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);
        }

        this.state = {
            libsLoaded: false,
            value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
            editorState,
            prevValue: proposedValue,
        };
    }

    public static getDerivedStateFromProps(props: IWysiwygProps, state: any) {
        const proposedValue = props.value !== null ? props.value : "";
        if (proposedValue !== state.prevValue) {
            if (proposedValue != state.value) {
                const html = proposedValue;
                const contentBlock = htmlToDraft(html);

                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);

                    return {
                        value: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                        editorState,
                        prevValue: proposedValue,
                    };
                }
            }

            return {
                prevValue: proposedValue,
            };
        }
        return null;
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

    public onEditorStateChange = (editorState: any) => {
        const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState(
            {
                value,
                editorState,
            },
            () => this.handleOnChange(value, null),
        );
    };

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

        const { editorState } = this.state;
        return (
            <>
                <Editor
                    editorState={editorState}
                    wrapperClassName="w-wysiwyg-wrapper"
                    editorClassName="w-wysiwyg-editor"
                    toolbarClassName="w-wysiwyg-toolbar"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        options: [
                            "inline",
                            "blockType",
                            "fontSize",
                            "list",
                            "textAlign",
                            "link",
                            "image",
                            "remove",
                            "history",
                        ],
                        inline: {
                            options: ["bold", "italic", "underline", "strikethrough", "superscript", "subscript"],
                            inDropdown: true,
                        },
                    }}
                />
            </>
        );
    }
}
