import * as React from "react";
import { storiesOf } from "@storybook/react";

import { LoadingIndicator } from "../../src/ctrl/LoadingIndicator";

storiesOf("Loading indicator", module)
    .add("Simple", () => (
        <>
            <div style={{ padding: 40 }}>
                <LoadingIndicator />
            </div>
        </>
    ))
    .add("With text", () => (
        <>
            <div style={{ padding: 40 }}>
                <LoadingIndicator text={"Data is loading now"} />
            </div>
        </>
    ))
    .add("Sizes", () => (
        <>
            <div style={{ padding: 40 }}>
                <h4>Size 1</h4>
                <LoadingIndicator />
                <h4>Size 2</h4>
                <LoadingIndicator size={2} />
                <h4>Size 3</h4>
                <LoadingIndicator size={3} />
                <h4>Size 4</h4>
                <LoadingIndicator size={4} />
            </div>
        </>
    ));
