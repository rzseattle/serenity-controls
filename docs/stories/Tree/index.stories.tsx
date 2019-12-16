import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Panel } from "../../../src/Panel";

import { Tree, INode } from "../../../src/Tree/Tree";
import { PrintJSON } from "../../../src/PrintJSON";

const initNodes: INode[] = [
    {
        value: "mars",
        label: "Mars",
        expanded: true,

        children: [
            {
                value: "phobos",
                label: "Phobos",
                expanded: true,
                children: [{ value: "Inny", label: "Inny", children: [] }, { value: "rozny", label: "Różny" }],
            },
            { value: "deimos", label: "Deimos" },
        ],
    },
    {
        value: "mars2",
        label: "Mars2",
        expanded: true,

        children: [
            {
                value: "phobos2",
                label: "Phobos",
                expanded: true,
                children: [{ value: "Inny2", label: "Inny", children: [] }, { value: "rozny2", label: "Różny" }],
            },
            { value: "deimos2", label: "Deimos" },
        ],
    },
];

const TreeTest = (props: any) => {
    const [nodes, setNodes] = useState(initNodes);
    const [currentNode, setCurrentNode] = useState(null);
    const [expanded, setExpanded] = useState({});

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, padding: 10 }}>
                <Tree
                    nodes={nodes}
                    onChange={(changedNodes: INode[]) => setNodes(changedNodes)}
                    onClick={(node) => setCurrentNode(node)}
                    onExpand={(currentExpanded) => setExpanded(currentExpanded)}

                />
            </div>
            <div style={{ flexGrow: 1, padding: 10 }}>
                <PrintJSON json={nodes} />
            </div>
            <div style={{ flexGrow: 1, padding: 10 }}>
                {/*<PrintJSON json={currentNode}/>*/}
                <pre>{currentNode && currentNode.label}</pre>
            </div>

            <div style={{ flexGrow: 1, padding: 10 }}>
                <PrintJSON json={expanded} />
            </div>
        </div>
    );
};

storiesOf("Tree", module).add("Base", () => (
    <Panel>
        <TreeTest />
    </Panel>
));
