import * as React from "react";
import { CommonIcons } from "../lib/CommonIcons";
import "./Navbar.sass";

interface IProps {
    children: any;
    toolbar?: any[];
}

export const Navbar = (props: IProps) => {
    const children = Array.isArray(props.children) ? props.children : [props.children];

    return (
        <div className="w-navbar">
            <ol>
                {children.filter(Boolean).map((child, key) => {
                    const last = key + 1 == props.children.filter(Boolean).length;

                    if (child !== null) {
                        return (
                            <li key={key} className={"ms-font-m " + (last ? "active" : "")}>
                                {child}
                                {!last && child !== null && <CommonIcons.chevronRight />}
                            </li>
                        );
                    }
                    return null;
                })}
            </ol>

            <div style={{ float: "right" }}>
                <div style={{ display: "table-cell", height: "50px", verticalAlign: "middle" }}>{props.toolbar}</div>
            </div>
        </div>
    );
};
