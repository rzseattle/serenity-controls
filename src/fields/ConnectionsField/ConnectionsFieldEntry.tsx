import * as React from "react";
import IConnectionElement from "./IConnectionElement";
import { Icon } from "../../common";


interface IConnectionsFieldEntryProps {
    item: IConnectionElement;
    onDelete: (value: string | number) => any;
    onClick: (el: IConnectionElement) => any;
    template?: any;
}

export class ConnectionsFieldEntry extends React.PureComponent<IConnectionsFieldEntryProps, any> {
    public handleDeleteClick = (value: string | number) => {
        if (this.props.onDelete) {
            this.props.onDelete(value);
        }
    };

    public render() {
        const { item, template, onClick } = this.props;
        return (
            <div
                className={
                    "w-connections-field-entry " +
                    item.className +
                    " " +
                    (onClick !== undefined ? "w-connections-field-entry-clickable" : "")
                }
                onClick={() => {
                    if (onClick !== undefined) {
                        onClick(item);
                    }
                }}
            >
                {template !== undefined ? (
                    template(item)
                ) : (
                    <>
                        {item.icon ? (
                            <div className="prepend">
                                <Icon name={item.icon} />
                            </div>
                        ) : (
                            <div style={{ width: 5 }} />
                        )}
                        <div className="content">{item.label}</div>
                    </>
                )}
                <div className="delete" onClick={() => this.handleDeleteClick(item.value)}>
                    <Icon name="Cancel" />
                </div>
            </div>
        );
    }
}
