import * as React from "react";
import "./Tabs.sass";
import { CommonIcons } from "../lib/CommonIcons";

type ITabsCallback = (index: number, e: any) => any;

interface ITabsProps {
    /**
     * On tab change
     */
    onTabChange?: ITabsCallback;
    /**
     * starting active tab
     */
    defaultActiveTab?: number;
    /**
     * Controled active tab
     */
    activeTab?: number;
    /**
     * All tabs will be mounted at component mount. Tab change will be faster.
     * Recommended only if needed.
     */
    mountAllTabs?: boolean;

    children: React.ReactElement<ITabPaneProps>[];
}

interface ITabsState {
    currentTab: number;
}

export class Tabs extends React.Component<ITabsProps, ITabsState> {
    public static defaultProps: Partial<ITabsProps> = {
        mountAllTabs: false,
        defaultActiveTab: 0,
    };

    constructor(props: ITabsProps) {
        super(props);
        this.state = {
            currentTab: props.activeTab || props.defaultActiveTab,
        };
    }

    public handleTabChange(index: number, e: React.MouseEvent) {
        if (this.props.onTabChange) {
            this.props.onTabChange(index, e);
        }
        if (this.props.activeTab == null) {
            this.setState({ currentTab: index });
        }
    }

    // public UNSAFE_componentWillReceiveProps(nextProps: Readonly<ITabsProps>): void {
    //     if (nextProps.activeTab != null) {
    //         this.setState({ currentTab: nextProps.activeTab });
    //     }
    // }

    static getDerivedStateFromProps(props: Readonly<ITabsProps>, state: ITabsState) {
        if (props.activeTab !== undefined && props.activeTab !== state.currentTab) {
            return {
                ...state,
                currentTab: props.activeTab,
            };
        }
        return null;
    }

    public render() {
        const p = this.props;
        const s = this.state;

        return (
            <div className="w-tabs">
                <div className="tabs-links">
                    {p.children.map((child: any, index) => {
                        return (
                            <div
                                key={index}
                                className={
                                    (index == s.currentTab ? "active" : "") +
                                    " " +
                                    (child.props.badge ? "with-badge" : "")
                                }
                                onClick={this.handleTabChange.bind(this, index)}
                            >
                                {child.props.icon ? <child.props.icon /> : null}
                                {child.props.title}
                                {child.props.badge != undefined ? (
                                    <div className="w-tabs-badge">{child.props.badge}</div>
                                ) : null}
                                {child.props.onClose && (
                                    <a
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            child.props.onClose(index);
                                        }}
                                        className={"tabs-close"}
                                    >
                                        <CommonIcons.close />
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="tabs-links-separator" />
                <div className="tab-pane-container">
                    {!this.props.mountAllTabs && p.children[s.currentTab]}

                    {this.props.mountAllTabs && (
                        <div>
                            {p.children.map((child, index) => {
                                if (child == null) {
                                    return;
                                }
                                return (
                                    <div
                                        key={"child" + index}
                                        style={{ display: index == s.currentTab ? "block" : "none" }}
                                    >
                                        {child}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

interface ITabPaneProps {
    /**
     * Tab title
     */
    title: string;
    /**
     * Tab badge
     */
    badge?: string | number;
    /**
     * Tab icon
     */
    icon?: React.JSXElementConstructor<any>;

    /**
     * If specyfied tab will display close button
     * @param index
     */
    onClose?: (index: number) => any;
    children?: JSX.Element | JSX.Element[];
}

export const TabPane = (props: ITabPaneProps) => {
    return <div className="tab-pane">{props.children}</div>;
};
