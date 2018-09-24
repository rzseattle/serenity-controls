import React from "react";
import { addDecorator } from "@storybook/react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { withInfo } from "@storybook/addon-info";

require("./Stories.sass");

addDecorator((story) => (
    <div className="w-panel-container">
        <div className="w-panel-body-container">
            <div className="w-panel-body" style={{paddingBottom: 10}}>{story()}</div>
        </div>
    </div>
));

require("./panel/index.stories");
require("./loader/index.stories.tsx");
require("./tabs/index.stories.tsx");

require("./fields/filesList.stories");

