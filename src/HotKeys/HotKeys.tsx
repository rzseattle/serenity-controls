import React, { useEffect, useRef } from "react";
//import styles from "./HotKeys.module.sass";
import { log } from "../lib/Log";

declare type Callback = (event: React.KeyboardEvent, keyName: string) => any;
interface IHandler {
    key: string | string[];
    handler: Callback;
    onRelease?: Callback;
}

interface IHotKeyProps {
    actions?: IHandler[];
    debug?: boolean;
    children: any;
    root?: boolean;
    autofocus?: boolean;
    captureInput?: boolean;
    observeFromInput?: string[];
    handler?: Callback;
    stopPropagation?: boolean;
    name?: string;
}

const findHandler = (involvedKeys: any, handlers: IHandler[]): IHandler | null => {
    for (const i of handlers) {
        if (typeof i.key == "string") {
            if (involvedKeys[i.key] == true) {
                return i;
                break;
            }
        } else if (Array.isArray(i.key)) {
            let pass = true;
            for (const oneOfKey of i.key) {
                if (involvedKeys[oneOfKey] == undefined) {
                    pass = false;
                }
            }
            if (pass) {
                return i;
                break;
            }
        }
    }

    return null;
};

const runHandler = (
    event: React.KeyboardEvent,
    callback: Callback,
    keys: string,
    stopPropagation: boolean,
    name: string,
    debug: boolean,
) => {
    if (stopPropagation) {

        event.stopPropagation();
        event.nativeEvent.stopPropagation();
    }
    if (debug) {
        log("[HotKeys:" + name + "] Running action:" + keys);
    }

    callback(event, keys);
};

const shouldBeProcessed = (
    event: React.KeyboardEvent,
    key: string,
    captureInput: boolean,
    observeFromInput: string[],
    debug: boolean,
    name: string,
): boolean => {
    const tag = (event.nativeEvent.target as HTMLElement).tagName.toLowerCase();
    if (!captureInput && (tag == "input" || tag == "textarea")) {
        if (!observeFromInput.includes(key)) {
            if (debug) {
                log(
                    "[HotKeys:" +
                        name +
                        "] Keypress ingored. Source from input. Key pressed: " +
                        key +
                        " | Event source:" +
                        tag,
                );
            }
            return false;
        } else {
            if (debug) {
                log(
                    "[HotKeys: " +
                        name +
                        "] Keypress not ignored (key observed from intput). Source from input. Key pressed: " +
                        key +
                        " | Event source:" +
                        tag,
                );
            }
        }
    }

    return true;
};

export const HotKeys = ({
    autofocus = false,
    actions = [],
    debug = false,
    children,
    root = false,
    captureInput = false,
    observeFromInput = [],
    handler = null,
    stopPropagation = true,
    name = "noname",
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
                        log("[HotKeys:" + name + "] Focusing root element");
                    }
                    // todo need to consider
                    ref.current?.focus();
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
            className={root ? "" : "" /*styles.div*/}
            style={{ display: "contents" }}
            ref={ref}
            tabIndex={-1}
            onKeyUp={(e) => {
                e.persist();
                const key: string = e.nativeEvent.key;
                if (shouldBeProcessed(e, key, captureInput, observeFromInput, debug, name)) {
                    const foundHandler = findHandler(map.current, actions);
                    if (foundHandler !== null && foundHandler.onRelease !== undefined) {
                        runHandler(
                            e,
                            foundHandler.onRelease,
                            Object.keys(map.current).join("+"),
                            stopPropagation,
                            name,
                            debug,
                        );
                    }
                    delete map.current[key];

                    if (handler !== null) {
                        runHandler(e, handler, Object.keys(map.current).join("+"), stopPropagation, name, debug);
                    }
                }
            }}
            onKeyDown={(e) => {
                e.persist();
                const key: string = e.nativeEvent.key;
                if (shouldBeProcessed(e, key, captureInput, observeFromInput, debug, name)) {
                    map.current[key] = true;
                    if (debug) {
                        log("[HotKeys:" + name + "] Key pressed: " + key + " | Event source:" + e.target);
                    }
                    if (handler !== null) {
                        runHandler(e, handler, Object.keys(map.current).join("+"), stopPropagation, name, debug);
                    }
                    const foundHandler = findHandler(map.current, actions);
                    if (foundHandler !== null) {
                        runHandler(
                            e,
                            foundHandler.handler,
                            Object.keys(map.current).join("+"),
                            stopPropagation,
                            name,
                            debug,
                        );
                    }
                }
            }}
        >
            {children}
        </div>
    );
};
