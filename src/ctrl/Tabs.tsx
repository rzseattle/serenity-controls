import * as React from "react";
import {Icon} from "frontend/src/ctrl/Icon";

interface ITabsCallback {
    (index: number, e: any): any;
}

interface ITabsProps {
    children: JSX.Element[] | any[];
    onTabChange?: ITabsCallback;
    defaultActiveTab?: number;
    activeTab?: number

}

interface ITabsState {
    currentTab: number
}

class Tabs extends React.Component<ITabsProps, ITabsState> {


    constructor(props) {
        super(props);
        this.state = {
            currentTab: props.activeTab || props.defaultActiveTab || 0
        }
    }

    handleTabChange(index, e) {
        if (this.props.onTabChange) {
            this.props.onTabChange(index, e);
        }
        if (this.props.activeTab == null) {
            this.setState({currentTab: index});
        }
    }

    componentWillReceiveProps(nextProps: Readonly<ITabsProps>, nextContext: any): void {
        if (nextProps.activeTab != null) {
            this.setState({currentTab: nextProps.activeTab});
        }
    }

    render() {
        const p = this.props;
        const s = this.state;

        return (
            <div className="w-tabs">
                <div className="tabs-links">
                    {React.Children.map(p.children, (child: any, index) => {
                        if (child == null) {
                            return;
                        }
                        return <div key={index} className={(index == s.currentTab ? 'active' : '') + ' ' + (child.props.badge ? 'with-badge' : '')} onClick={this.handleTabChange.bind(this, index)}>
                            {child.props.icon ?
                                <Icon name={child.props.icon}/>
                                : null}
                            {child.props.title}
                            {child.props.badge != undefined ? <div className="w-tabs-badge">({child.props.badge})</div> : null}

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


interface ITabPaneProps {
    title: string,
    badge?: string | number,
    icon?: string,
    children?: any

}

const TabPane: React.StatelessComponent<ITabPaneProps> = (props) => {

    return (
        <div className="tab-pane">
            {props.children}
        </div>
    )
}


export {Tabs, TabPane}
