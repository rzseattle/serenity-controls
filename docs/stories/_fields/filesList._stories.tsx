import * as React from "react";
import { storiesOf } from "@storybook/react";

import { BaseX, Test2 } from "./example";

storiesOf("Files fieds", module).add("File list", () => (
    <>
        <BaseX base={"1"} />

        <Test2 base={"asd"} loading={true} />
    </>
));
