import React, {Component} from 'react';
import PropTypes from 'prop-types';

const TimelineItem = (props) => {


    return (
        <div className="tab-pane">
            {props.children}
        </div>
    )
}

TimelineItem.propTypes = {
    color: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.string,
    action: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.node,
}

TimelineItem.defaultProps = {
    //kolor
    color: 'blue'
}

class Timeline extends Component {


    static propTypes = {
        children: PropTypes.arrayOf(TimelineItem).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.defaultActiveTab || 0
        }
    }


    render() {
        const p = this.props;
        return (
            <div className="w-timeline">
                <ul>
                    {p.children.map((child, index) =>
                        <li key={index}>
                            {index+1 < p.children.length && <div className="tail"></div>}
                            <div className={'head ' + child.props.color  + (child.props.icon?' fa fa-'+child.props.icon:' head-circle')}></div>
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

        const s = this.state;
    }
}


export {Timeline, TimelineItem}