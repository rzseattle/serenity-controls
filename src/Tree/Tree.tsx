import * as React from "react";

import "./Tree.sass";

import { useEffect, useState } from "react";
import { deepCopy } from "../lib";

export interface INode {
    label: JSX.Element | string;
    value: string;
    expanded?: boolean;
    children?: INode[];
    className?: string;
    disabled?: boolean;
    icon?: JSX.Element;
    showCheckbox?: boolean;
    title?: string;
}

export interface IIcons {
    check?: JSX.Element;
    uncheck?: JSX.Element;
    halfCheck?: JSX.Element;
    expandOpen?: JSX.Element;
    expandClose?: JSX.Element;
    expandAll?: JSX.Element;
    collapseAll?: JSX.Element;
    parentClose?: JSX.Element;
    parentOpen?: JSX.Element;
    leaf?: JSX.Element;
}

export interface ILanguage {
    collapseAll: string;
    expandAll: string;
    toggle: string;
}

export interface ICheckboxProps {
    nodes: INode[];
    checked: string[];
    expanded: string[];
    onCheck: (checked: string[]) => any;
    onExpand: (expanded: string[]) => any;

    disabled?: boolean;
    expandDisabled?: boolean;
    expandOnClick?: boolean;
    icons?: IIcons;
    lang?: ILanguage;
    name?: string;
    nameAsArray?: boolean;
    nativeCheckboxes?: boolean;
    noCascade?: boolean;
    onlyLeafCheckboxes?: boolean;
    optimisticToggle?: boolean;
    showExpandAll?: boolean;
    showNodeIcon?: boolean;
    showNodeTitles?: boolean;
    onClick?: (node: INode) => any;
    onChange: (nodes: INode[]) => any;
}

const iterateOverAll = (nodes: INode[], callback: (node: INode) => any) => {
    nodes.forEach((node) => {
        callback(node);
        if (node.children != undefined) {
            iterateOverAll(node.children, callback);
        }
    });
};

export const Tree = (props: ICheckboxProps) => {
    const tmpExpanded: string[] = [];
    iterateOverAll(props.nodes, (node: INode) => {
        node.showCheckbox = false;
        if (node.expanded === true) {
            tmpExpanded.push(node.value);
        }
    });

    const [expanded, setExpanded] = useState(tmpExpanded);

    let icons = {};
    if (props.icons !== undefined) {
        icons = { ...icons, ...props.icons };
    }

    return (
        <div className="w-tree">
            in developement
            {/*<CheckboxTree

                {...props}
                icons={icons}
                expandOnClick={true}
                // @ts-ignore
                onClick={(targetNode: INode) => {
                    targetNode.expanded = !targetNode.expanded;
                    if (props.onClick) {
                        props.onClick(targetNode);
                    }

                    if (props.onChange) {
                        const tmp = deepCopy(props.nodes);
                        iterateOverAll(tmp, (node) => {
                            if (node.value == targetNode.value) {
                                node.expanded = targetNode.expanded;
                            }
                        });

                        props.onChange(tmp);
                    }
                }}
                expanded={expanded}
                // @ts-ignore
                onExpand={(expandend, targetNode) => {
                    if (props.onExpand) {
                        props.onExpand([...expanded, targetNode.value]);
                    }
                    setExpanded(expandend);
                }}
            />*/}
        </div>
    );
};
