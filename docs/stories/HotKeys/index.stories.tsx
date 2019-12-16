import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { Panel } from "../../../src/Panel";
import { Icon } from "../../../src/Icon";
import { HotKeys } from "../../../src/HotKeys";
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
        const [key, setKey] = useState("----");
        return (
            <>
                <Panel title="Default - not tracked">
                    <HotKeys
                        handler={(event, keyName) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            setKey(keyName);
                        }}
                    >
                        <div style={style}>
                            <input type="text" />
                        </div>
                    </HotKeys>
                </Panel>
                <Panel title="Tracked">
                    <HotKeys
                        handler={(event, keyName) => {
                            event.stopPropagation();
                            event.nativeEvent.stopPropagation();
                            setKey(keyName);
                        }}
                        captureInput={true}
                    >
                        <div style={style}>
                            <input type="text" />
                        </div>
                    </HotKeys>

                </Panel>
                Keypressed: {key}
            </>
        );
    });
