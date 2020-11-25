import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../../../src/Panel";
import { HotKeys } from "../../../../src/HotKeys";
import { Key } from "ts-key-enum";
import { useState } from "@storybook/addons";

const style = {
    padding: 20,
    border: "solid 1px grey",
    marginBottom: 10,
};

storiesOf("HotKeys", module)
    .add("Base", () => {
        const [key, setKey] = useState("----");

        return (
            <Panel>
                <HotKeys
                    actions={[
                        {
                            key: Key.Escape,
                            handler: (event, keyName) => {
                                setKey(keyName);
                            },
                            onRelease: (event, keyName) => {
                                setKey("");
                            },
                        },
                    ]}
                >
                    <div style={style}>
                        <b>press ESC</b>
                    </div>
                </HotKeys>
                <HotKeys
                    autofocus={true}
                    actions={[
                        {
                            key: [Key.Control, Key.ArrowRight],
                            handler: (event, keyName) => {
                                setKey(keyName);
                            },
                            onRelease: (event, keyName) => {
                                setKey("");
                            },
                        },
                    ]}
                >
                    <div style={style}>
                        Autofocused, press <b>ctrl+arrow</b> right
                    </div>
                </HotKeys>
                <HotKeys
                    autofocus={true}
                    handler={(event, keyName) => {
                        event.stopPropagation();
                        event.nativeEvent.stopPropagation();
                        setKey(keyName);
                    }}
                >
                    <div style={style}>
                        <b>Any key</b>
                    </div>
                </HotKeys>
                <hr />
                Keypressed: {key}
            </Panel>
        );
    })
    .add("Input tracking", () => {
        const [key1, setKey1] = useState("----");
        const [key2, setKey2] = useState("----");
        const [key3, setKey3] = useState("----");
        return (
            <>
                <Panel title="Default - not tracked">
                    <HotKeys
                        handler={(event, keyName) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            setKey1(keyName);
                        }}
                    >
                        <div style={style}>
                            <input type="text" /> Keypressed: {key1}
                        </div>
                    </HotKeys>
                </Panel>
                <Panel title="Tracked">
                    <HotKeys
                        handler={(event, keyName) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            setKey2(keyName);
                        }}
                        captureInput={true}
                    >
                        <div style={style}>
                            <input type="text" /> Keypressed: {key2}
                        </div>
                    </HotKeys>
                </Panel>
                <Panel title="Tracked only selected">
                    <HotKeys
                        handler={(event, keyName) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            setKey3(keyName);
                        }}
                        observeFromInput={["a"]}
                    >
                        <div style={style}>
                            <input type="text" /> Keypressed: {key3}
                        </div>
                    </HotKeys>
                </Panel>
            </>
        );
    })
    .add("Bumbling", () => {
        const [key1, setKey1] = useState("");
        const [key2, setKey2] = useState("");
        const [key3, setKey3] = useState("");
        return (
            <>
                <Panel>
                    <HotKeys
                        handler={(event, keyName) => {
                            event.preventDefault();
                            if (keyName != "") {
                                setKey1(key1 + keyName);
                            }
                        }}
                        captureInput={true}
                    >
                        Tracking all not tracked
                        <div style={style}>
                            <input type="text" value={key1} /> Keypressed: {key1}
                        </div>
                        <Panel>
                            <HotKeys
                                handler={(event, keyName) => {
                                    event.preventDefault();
                                    if (keyName != "") {
                                        setKey2(key2 + keyName);
                                    }
                                }}
                                observeFromInput={["b", "c"]}
                            >
                                Tracking all not tracked "<b>b</b>" and "<b>c</b>" from children
                                <div style={style}>
                                    <input type="text" value={key2} /> Keypressed: {key2}
                                </div>
                                <Panel title="Tracked only selected">
                                    <HotKeys
                                        handler={(event, keyName) => {
                                            event.preventDefault();
                                            if (keyName != "") {
                                                setKey3(key3 + keyName);
                                            }
                                        }}
                                        observeFromInput={["x"]}
                                    >
                                        Tracking only "<b>x</b>"
                                        <div style={style}>
                                            <input type="text" value={key3} /> Keypressed: {key3}
                                        </div>
                                    </HotKeys>
                                </Panel>
                            </HotKeys>
                        </Panel>
                    </HotKeys>
                </Panel>
            </>
        );
    });
