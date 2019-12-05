import React, { KeyboardEventHandler, useEffect, useRef } from "react";
import styles from "./HotKeys.module.sass";

interface IHotKeyProps {
    actions: { [index: string]:  (event: React.KeyboardEvent, keyName: string) => any  };
    debug?: boolean;
    children: any;
    root?: boolean;
    autofocus?: boolean;
    captureInput?: boolean;
    filter?: ( event: React.KeyboardEvent ) => boolean
}

export const HotKeys = ({
    autofocus = false,
    actions,
    debug = false,
    children,
    root = false,
    captureInput = false,
    filter= (event) => true

}: IHotKeyProps) => {
    const ref = useRef<HTMLDivElement>();

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
            onKeyUp={() => {}}
            onKeyDown={(e ) => {
                e.persist();
                let tag = (e.nativeEvent.target as HTMLElement).tagName.toLowerCase();
                const key: string = e.nativeEvent.key;

                if (!captureInput) {
                    if (tag == "input" || tag == "textarea") {
                        if (debug) {
                            console.log("[HotKeys] Keypress ingored. Source from input. Key pressed: " + key + " | Event source:" + tag );
                        }
                        return false;
                    }
                }


                if (debug) {
                    console.log("[HotKeys] Key pressed: " + key + " | Event source:" + tag);
                    if (actions[key] !== undefined) {
                        console.log("[HotKeys] Running action:" + key);
                    } else {
                        console.log("[HotKeys] No action found:", Object.keys(actions).join(","));
                    }
                }

                if (actions[key] !== undefined) {
                    e.stopPropagation();
                    e.nativeEvent.stopPropagation();
                    actions[key](e, key);
                }
            }}
        >
            {children}
        </div>
    );
};
