import * as React from "react";


interface ITimelineItemProps {
    color?: string,
    time?: string,
    user?: string,
    action?: string,
    icon?: string,
    children?: string,
}

const TimelineItem: React.StatelessComponent<ITimelineItemProps> = (props) => {


    return (
        <div className="tab-pane">
            {props.children}
        </div>
    )
}


TimelineItem.defaultProps = {
    //kolor
    color: 'blue'
}


interface ITimelineProps {
    children?: any,
}


class Timeline extends React.Component<ITimelineProps, any> {

    constructor(props) {
        super(props);
    }


    render() {
        const p = this.props;
        return (
            <div className="w-timeline">
                <ul>
                    {p.children.map((child, index) =>
                        <li key={index}>
                            {index + 1 < p.children.length && <div className="tail"></div>}
                            <div className={'head ' + child.props.color + (child.props.icon ? ' fa fa-' + child.props.icon : ' head-circle')}></div>
                            <div className="content">
                                <p className="content-head">{child.props.time}
                                    {child.props.user && <span className="user">[{child.props.user}]</span>}
                                    {child.props.action && <span className="action">{child.props.action}</span>}
                                </p>
                                {child}

                            </div>

                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export {Timeline, TimelineItem}
