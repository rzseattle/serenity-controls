import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface IIconProps {
    children: any;
}

const HeightAdjuster = React.memo((props: IIconProps) => {
    const divRef = useRef<HTMLDivElement>();

    const [height, setHeight] = useState("auto");

    useEffect(() => {
        const adjust = () => {
            const elementData = divRef.current.getBoundingClientRect();
            setHeight(window.innerHeight - elementData.top - 10 + "px");
        }
        adjust();
        window.addEventListener("resize", adjust);
        return () => window.removeEventListener("resize", adjust)
    }, []);

    return (
        <div style={{ height: height }} ref={divRef}>
            {props.children}
        </div>
    );
});

export { HeightAdjuster };
