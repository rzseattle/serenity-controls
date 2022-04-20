import * as React from "react";
import "./Timeline.sass";

interface ITimelineItemProps {
    color?: string;
    time?: string;
    user?: string;
    action?: string;
    icon?: string | ((data: ITimelineItemProps) => string | false);
    children: React.ReactElement[];
}

const TimelineItem = (props: ITimelineItemProps) => {
    return <div className="tab-pane">{props.children}</div>;
};

TimelineItem.defaultProps = {
    color: "blue",
};

interface ITimelineProps {
    children?: React.Component<ITimelineItemProps>[];
}

class Timeline extends React.Component<ITimelineProps> {
    constructor(props: ITimelineProps) {
        super(props);
    }

    public render() {
        const p = this.props;
        return (
            <div className="w-timeline">
                <ul>
                    {p.children.map((child, index) => {
                        const props: ITimelineItemProps = child.props;
                        const icon = typeof props.icon == "function" ? props.icon(props) : props.icon;
                        return (
                            <div key={index}>
                                {index + 1 < p.children.length && <div className="tail" />}
                                <div
                                    className={
                                        "head " + props.color + (icon ? " ms-Icon ms-Icon--" + icon : " head-circle")
                                    }
                                />
                                <div className="content">
                                    <p className="content-head">
                                        {props.time}
                                        {props.user && <span className="user">[{props.user}]</span>}
                                        {props.action && <span className="action">{props.action}</span>}
                                    </p>
                                    <>{child}</>
                                </div>
                            </div>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export { Timeline, TimelineItem };
