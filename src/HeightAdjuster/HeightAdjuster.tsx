import * as React from "react";
import { useEffect, useRef, useState } from "react";

export const debounce = (func: (...args: any) => any, wait = 100) => {
    let timeout: number;
    return function (...args: any) {
        clearTimeout(timeout);
        // @ts-ignore
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
};

interface IHelpAdjusterProps {
    children: React.ReactChild | ((height: number) => React.ReactChild);
    parent?: () => HTMLElement;
    offsetTopCorrection?: number;
}

const HeightAdjuster = React.memo((props: IHelpAdjusterProps) => {
    const divRef = useRef<HTMLDivElement>();

    const [height, setHeight] = useState(-1);

    let el: Element = document.documentElement;

    // tmp to change
    const result = document.getElementsByClassName("w-panel-body");
    if (result.length > 0) {
        el = result[0];
    }
    // \tmp to change

    //const originalWindowHeight = el.scrollHeight;

    // useEffect(() => {
    //     if (props.parent === undefined && height != -1) {
    //         //w-panel-body
    //         if (originalWindowHeight < el.scrollHeight) {
    //             //setHeight(height - (el.scrollHeight - originalWindowHeight));
    //         }
    //     }
    // }, [height]);

    useEffect(() => {
        const adjust = () => {
            const elementData = divRef.current.getBoundingClientRect();
            const data =
                props.parent !== undefined
                    ? props.parent().getBoundingClientRect()
                    : {
                          height: window.innerHeight,
                          top: props.offsetTopCorrection !== undefined ? -props.offsetTopCorrection : 0,
                      };

            const top = elementData.top - data.top;

            setHeight(data.height - top);
        };
        adjust();

        const debounced = debounce(adjust, 100);
        window.addEventListener("resize", debounced);
        return () => window.removeEventListener("resize", debounced);
    }, []);

    return (
        <div style={{ height: height == -1 ? "100px" : height + "px" }} ref={divRef}>
            {typeof props.children == "function" ? props.children(height) : props.children}
        </div>
    );
});

export { HeightAdjuster };
