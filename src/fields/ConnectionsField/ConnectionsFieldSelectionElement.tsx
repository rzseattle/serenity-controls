import IConnectionElement from "./IConnectionElement";
import * as React from "react";

interface ISelectionProps {
    items: any[];
    selectedIndex: number;
    elementTemplate?: (element: any) => any;
    elementClicked?: (index: number, element: any) => any;
    selectionChange?: (index: number, element: any) => any;
}

export default class ConnectionsFieldSelectionElement extends React.PureComponent<ISelectionProps, any> {
    public handleMouseEnter(index: number, el: IConnectionElement) {
        this.props.selectionChange(index, el);
    }

    public handleMouseClick(index: number, el: IConnectionElement) {
        this.props.elementClicked(index, el);
    }

    public render() {
        return (
            <div className="w-selection">
                {this.props.items.map((el, index) => (
                    <div
                        key={el.value}
                        className={
                            "w-selection-element " +
                            (index == this.props.selectedIndex ? "w-selection-element-selected" : "")
                        }
                        onMouseEnter={this.handleMouseEnter.bind(this, index, el)}
                        onMouseDown={this.handleMouseClick.bind(this, index, el)}
                    >
                        {this.props.elementTemplate ? this.props.elementTemplate(el) : el.label}
                    </div>
                ))}
            </div>
        );
    }
}
