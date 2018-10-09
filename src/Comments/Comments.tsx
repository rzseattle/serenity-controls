import * as React from "react";
import { fI18n } from "../lib";

interface ICommentsProps {
    children: any;
    commentAdded: (comment: string) => boolean;
}

interface ICommentsState {
    addMode: boolean;
    rows: number;
}

class Comments extends React.Component<ICommentsProps, ICommentsState> {
    public textarea: HTMLTextAreaElement;

    constructor(props: ICommentsProps) {
        super(props);
        this.state = {
            addMode: false,
            rows: 1,
        };
    }

    public handleAddComment = () => {
        const result = this.props.commentAdded(this.textarea.value);
        if (result) {
            this.setState({ addMode: false, rows: 1 });
            this.textarea.value = "";
        }
    };

    public handleCommentCancel = () => {
        this.setState({ addMode: false, rows: 1 });
        this.textarea.value = "";
    };

    public handleTextareaFocus = () => {
        this.setState({ addMode: true });
    };

    public handleRowCalc = () => {
        const rows = this.textarea.value.split("\n").length;
        this.setState({ rows });
    };

    public render() {
        const p = this.props;

        return (
            <div className="w-comments">
                <div>{p.children}</div>
                <textarea
                    placeholder={fI18n.t("frontend:comments.addComment")}
                    rows={this.state.rows}
                    ref={(el) => (this.textarea = el)}
                    style={{ width: "100%" }}
                    onFocus={this.handleTextareaFocus}
                    onChange={this.handleRowCalc}
                />
                {this.state.addMode && (
                    <div className="clearfix">
                        <a className="btn btn-primary pull-right" onClick={this.handleAddComment}>
                            {fI18n.t("frontend:add")}
                        </a>
                        <a className="btn pull-right" onClick={this.handleCommentCancel}>
                            {fI18n.t("frontend:cancel")}
                        </a>
                    </div>
                )}
            </div>
        );
    }
}

interface ICommentItemProps {
    author: string;
    time: string;
    children: any;
}

const CommentItem: React.StatelessComponent<ICommentItemProps> = (props) => {
    return (
        <div className="comment">
            <a className="avatar">
                <img src="https://semantic-ui.com/images/avatar/small/matt.jpg" alt="" />
            </a>
            <div className="content">
                <a className="author">{props.author}</a>
                <div className="metadata">
                    <span className="date">{props.time}</span>
                </div>
                <div className="text">{props.children}</div>
                {/*<div className="actions">
                    <a className="reply">Reply</a>
                </div>*/}
            </div>
        </div>
    );
};

export { Comments, CommentItem };
