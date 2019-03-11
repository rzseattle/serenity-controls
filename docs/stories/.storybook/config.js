import { configure, addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import '@storybook/addon-console';

addDecorator(withInfo);
// automatically import all files ending in *.stories.js
const req = require.context("../", true, /.stories.tsx$/);
function loadStories() {
    req.keys().forEach((filename) => {
        //console.log(filename);
        if (filename == "./index.stories.tsx") {
            req(filename);
        } else {
            //console.log(filename, "dabug");
        }
    });
}

configure(loadStories, module);
