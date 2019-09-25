import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface IIconProps {
    children: React.ReactChild | ((height: number) => React.ReactChild);
    parent?: () => HTMLElement;
}

const HeightAdjuster = React.memo((props: IIconProps) => {
    const divRef = useRef<HTMLDivElement>();

    const [height, setHeight] = useState(-1);

    let el: Element = document.documentElement;
    el = document.getElementsByClassName("w-panel-body")[0];
    const originalWindowHeight = el.scrollHeight;

    useEffect(() => {
        if (props.parent === undefined && height != -1) {
            //w-panel-body
            if (originalWindowHeight < el.scrollHeight) {
                setHeight(height - (el.scrollHeight - originalWindowHeight));
            }
        }
    }, [height]);

    useEffect(() => {
        const adjust = () => {
            const elementData = divRef.current.getBoundingClientRect();
            const data =
                props.parent !== undefined
                    ? props.parent().getBoundingClientRect()
                    : {
                          height: window.innerHeight,
                          top: 0,
                      };

            const top = elementData.top - data.top;
            setHeight(data.height - top);
        };
        adjust();
        window.addEventListener("resize", adjust);
        return () => window.removeEventListener("resize", adjust);
    }, []);

    return (
        <div style={{ height: height == -1 ? "100px" : height + "px" }} ref={divRef}>
            {typeof props.children == "function" ? props.children(height) : props.children}
        </div>
    );
});

export { HeightAdjuster };
