import React, { KeyboardEventHandler, useEffect, useRef } from "react";
import styles from "./HotKeys.module.sass";

interface IHotKeyProps {
    actions: Array<{ key: string | string[]; handler: (event: React.KeyboardEvent, keyName: string) => any }>;
    debug?: boolean;
    children: any;
    root?: boolean;
    autofocus?: boolean;
    captureInput?: boolean;
    // filter?: (event: React.KeyboardEvent) => boolean;
}

export const HotKeys = ({
    autofocus = false,
    actions,
    debug = false,
    children,
    root = false,
    captureInput = false,
}: // filter = (event) => true,
IHotKeyProps) => {
    const ref = useRef<HTMLDivElement>();

    const map = useRef<any>({});

    useEffect(() => {
        if (autofocus) {
            ref.current.focus();
        }

        if (!root) {
            return;
        }
        const listener = () => {
            setTimeout(() => {
                if (document.activeElement.tagName.toLowerCase() == "body") {
                    if (debug) {
                        console.log("[HotKeys] Focusing root element");
                    }
                    ref.current.focus();
                }
            }, 20);
        };
        listener();
        document.body.addEventListener("blur", listener, true);

        return () => {
            document.body.removeEventListener("blur", listener, true);
        };
    }, []);

    return (
        <div
            className={root ? "" : styles.div}
            ref={ref}
            tabIndex={-1}
            onKeyUp={(e) => {
                const key: string = e.nativeEvent.key;
                delete map.current[key];
            }}
            onKeyDown={(e) => {
                e.persist();
                let tag = (e.nativeEvent.target as HTMLElement).tagName.toLowerCase();
                const key: string = e.nativeEvent.key;

                if (!captureInput) {
                    if (tag == "input" || tag == "textarea") {
                        if (debug) {
                            console.log(
                                "[HotKeys] Keypress ingored. Source from input. Key pressed: " +
                                    key +
                                    " | Event source:" +
                                    tag,
                            );
                        }
                        return false;
                    }
                }

                map.current[key] = true;

                if (debug) {
                    console.log("[HotKeys] Key pressed: " + key + " | Event source:" + tag);
                }

                for (const i of actions) {
                    if (typeof i.key == "string") {
                        if (map.current[i.key] == true) {
                            if (debug) {
                                console.log("[HotKeys] Running action:" + key);
                            }
                            i.handler(e, key);

                            break;
                        }
                    } else if (Array.isArray(i.key)) {
                        let pass = true;
                        for (const oneOfKey of i.key) {
                            if (map.current[oneOfKey] == undefined) {
                                pass = false;
                            }
                        }
                        if (pass) {
                            e.stopPropagation();
                            e.nativeEvent.stopPropagation();
                            i.handler(e, key);
                            if (debug) {
                                console.log("[HotKeys] Running action:" + key);
                            }
                            break;
                        } else {
                            //console.log("not pass !!!");
                        }
                    }
                }

                /*if (actions[key] !== undefined && false) {
                    e.stopPropagation();
                    e.nativeEvent.stopPropagation();
                    actions[key](e, key);
                }*/
            }}
        >
            {children}
        </div>
    );
};
