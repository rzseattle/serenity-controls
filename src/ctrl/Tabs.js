import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {


    static propTypes = {
        children: PropTypes.node.isRequired,
        /**
         * Default tab that will be activate
         */
        defaultActiveTab: PropTypes.number,
        onTabChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.defaultActiveTab || 0
        }
    }

    handleTabChange( index, e ){
        if(this.props.onTabChange){
            this.props.onTabChange(index, e);
        }
        this.setState({currentTab: index});
    }


    render() {
        const p = this.props;
        const s = this.state;

        return (
            <div className="w-tabs">
                <div className="tabs-links">
                    {React.Children.map(p.children, (child, index) => {
                        return <div key={index} className={(index == s.currentTab ? 'active' : '') + ' ' + (child.props.badge ? 'with-badge' : '')} onClick={this.handleTabChange.bind(this, index)}>
                            {child.props.icon ?
                                <i className={'fa fa-' + child.props.icon}></i>
                                : null}
                            {child.props.title}
                            {child.props.badge != undefined ?<div className="w-tabs-badge">({child.props.badge})</div>: null}

                        </div>
                    })}
                </div>
                <div className="tabs-links-separator"></div>
                <div className="tab-pane-container">
                    {p.children[s.currentTab]}
                </div>
            </div>
        )
    }
}

const TabPane = (props) => {
    return (
        <div className="tab-pane">
            {props.children}
        </div>
    )
}

TabPane.propTypes = {
    title: PropTypes.string,
    badge: PropTypes.oneOfType( [PropTypes.string, PropTypes.number ]),
    icon: PropTypes.string,
    children: PropTypes.node

}

export {Tabs, TabPane}
