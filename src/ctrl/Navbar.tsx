import * as React from "react";
import {ICommand} from "../lib/ICommand"

interface IProps {
    children: Array<any>
    toolbar?: Array<any>
}

export default (props: IProps) => {

    let children = Array.isArray(props.children) ? props.children : [props.children];

    return (
        <div className="w-navbar">
            <ol>
                {children.map((child, key) =>
                    <li key={key} className={'ms-font-m ' + (key + 1 == props.children.length ? 'active' : '')}>
                        {child}
                        <i className="ms-Icon ms-Icon--ChevronRight" aria-hidden="true"/>
                    </li>
                )}
            </ol>

            <div style={{float: 'right'}}>
                <div style={{display: 'table-cell', height: '50px', verticalAlign: 'middle'}}>
                    {props.toolbar}
                </div>
            </div>
        </div>

    )
}



