import React from "react";
import { storiesOf } from "@storybook/react";

import { ConnectionsField, IConnectionFieldInput } from "../../src/ctrl/fields/ConnectionsField/ConnectionsField";
import IConnectionElement from "../../src/ctrl/fields/ConnectionsField/IConnectionElement";

import "./ConnectionField.stories.sass";
import { Comm } from "../../src/ctrl/lib";
import { Panel } from "../../src/ctrl/common";

const dataSource = (input: IConnectionFieldInput) =>
    new Promise<IConnectionElement[]>((resolve) => {
        Comm._get("https://jsonplaceholder.typicode.com/users").then((result: any[]) => {
            const value: IConnectionElement[] = result
                .map((el) => ({
                    value: el.id,
                    label: el.name,
                    data: el,
                }))
                .filter((el) => {
                    return (
                        (!(input.selected as number[]).includes(el.value) &&
                            input.requestType == "search" &&
                            el.label.toLowerCase().indexOf(input.searchString.toLowerCase()) !== -1) ||
                        ((input.selected as number[]).includes(el.value) && input.requestType == "getItems")
                    );
                });
            resolve(value);
        });
    });

storiesOf("Connection Field", module)
    .add("Base", () => {
        return (
            <Panel>
                <ConnectionsField value={[1, 2, 3]} fillItems={true} searchResultProvider={dataSource} />
            </Panel>
        );
    })

    .add("With icons", () => {
        const icons = ["Accounts", "AddOnlineMeeting", "AirplaneSolid", "Broom"];
        let count = 0;
        const localDataSource = (input: IConnectionFieldInput) => {
            return new Promise<IConnectionElement[]>((resolve) => {
                dataSource(input).then((result: IConnectionElement[]) => {
                    resolve(
                        result.map((el, index) => {
                            return { ...el, icon: icons[count++] };
                        }),
                    );
                });
            });
        };

        return (
            <Panel>
                <ConnectionsField value={[1, 2, 3]} fillItems={true} searchResultProvider={localDataSource} />
            </Panel>
        );
    })
    .add("With custom classes", () => {
        const classes: string[] = ["class1", "class2", "class3"];
        let count = 0;
        const localDataSource = (input: IConnectionFieldInput) => {
            return new Promise<IConnectionElement[]>((resolve) => {
                dataSource(input).then((result: IConnectionElement[]) => {
                    resolve(
                        result.map((el, index) => {
                            return { ...el, className: classes[count++] };
                        }),
                    );
                });
            });
        };

        return (
            <Panel>
                <ConnectionsField value={[1, 2, 3]} fillItems={true} searchResultProvider={localDataSource} />
            </Panel>
        );
    })

    .add("Vertical presentation", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        value={[1, 2, 3]}
                        fillItems={true}
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                    />
                </div>
            </Panel>
        );
    })
    .add("Selection template", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                        selectionTemplate={(el) => (
                            <div>
                                <b>{el.label}</b>
                                <div>
                                    <small>{el.data.email}</small>
                                </div>
                                <div>
                                    <small>phone: {el.data.phone}</small>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </Panel>
        );
    })
    .add("Item template", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                        value={[1, 2, 3]}
                        fillItems={true}
                        itemTemplate={(el) => (
                            <div style={{ padding: "5px 10px" }}>
                                <b>{el.label}</b>
                                <div>
                                    <small>{el.data.email}</small>
                                </div>
                                <div>
                                    <small>phone: {el.data.phone}</small>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <div style={{ marginTop: 50 }}>
                    <ConnectionsField
                        searchResultProvider={dataSource}
                        value={[1, 2, 3]}
                        fillItems={true}
                        itemTemplate={(el) => (
                            <div style={{ padding: "5px 10px" }}>
                                <b>{el.label}</b>
                                <div>
                                    <small>{el.data.email}</small>
                                </div>
                                <div>
                                    <small>phone: {el.data.phone}</small>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </Panel>
        );
    })
    .add("Item clickable", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                        value={[1, 2, 3]}
                        fillItems={true}
                        onItemClick={(el) => alert(el.label)}
                        itemTemplate={(el) => (
                            <div style={{ padding: "5px 10px" }}>
                                <b>{el.label}</b>
                                <div>
                                    <small>{el.data.email}</small>
                                </div>
                                <div>
                                    <small>phone: {el.data.phone}</small>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </Panel>
        );
    })
    .add("Search without phrase entered", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                        searchWithoutPhrase={true}
                        selectionTemplate={(el) => (
                            <div>
                                <b>{el.label}</b>
                                <div>
                                    <small>{el.data.email}</small>
                                </div>
                                <div>
                                    <small>phone: {el.data.phone}</small>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </Panel>
        );
    })
    .add("Debug", () => {
        return (
            <Panel>
                <div style={{ width: 300 }}>
                    <ConnectionsField
                        value={[1, 2, 3]}
                        fillItems={true}
                        searchResultProvider={dataSource}
                        verticalDisplay={true}
                        debug={true}
                    />
                </div>
            </Panel>
        );
    });
