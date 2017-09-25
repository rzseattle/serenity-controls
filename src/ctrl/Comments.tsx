import * as React from "react";

interface ICommentsProps  {
    children: any
}

class Comments extends React.Component<ICommentsProps, any> {

    constructor(props) {
        super(props);

    }

    render() {
        const p = this.props;
        const s = this.state;

        return (
            <div className="w-comments">
                {p.children}
            </div>
        )
    }
}
interface ICommentItemProps {
    author: string;
    time: string
    children: any
}

const CommentItem: React.StatelessComponent<ICommentItemProps> = (props) => {
    return (
        <div className="comment">
            <a className="avatar">
                <img src="https://semantic-ui.com/images/avatar/small/matt.jpg" alt=""/>
            </a>
            <div className="content">
                <a className="author">{props.author}</a>
                <div className="metadata">
                    <span className="date">{props.time}</span>
                </div>
                <div className="text">
                    {props.children}
                </div>
                {/*<div className="actions">
                    <a className="reply">Reply</a>
                </div>*/}
            </div>
        </div>

    )
}

export {Comments, CommentItem}