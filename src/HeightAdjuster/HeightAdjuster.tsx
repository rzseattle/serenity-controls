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
    fitToParent?: boolean;
    offsetTopCorrection?: number;
}

// eslint-disable-next-line react/display-name
const HeightAdjuster = React.memo((props: IHelpAdjusterProps) => {
    const divRef = useRef<HTMLDivElement>();

    const [height, setHeight] = useState(-1);

    useEffect(() => {
        let parent: HTMLElement = null;

        if (props.fitToParent !== undefined && props.fitToParent === true) {
            parent = divRef.current.parentElement;
        } else if (props.parent !== undefined) {
            parent = props.parent();
        }

        const adjust = () => {
            const elementData = divRef.current.getBoundingClientRect();
            const data =
                parent !== null
                    ? parent.getBoundingClientRect()
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
