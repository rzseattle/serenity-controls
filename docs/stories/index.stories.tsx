import React from "react";
import { addDecorator } from "@storybook/react";
import { configGetAll, configSet } from "../../src/backoffice/Config";
import "./Stories.sass";
import { fI18n, langContainer } from "../../src/lib";

import { I18nextProvider } from "react-i18next"; // the initialized i18next instance

langContainer.add(
    "pl",
    () =>
        new Promise((resolve) => {
            import("../../src/translations/i18n.pl").then((result) => {
                resolve({ lang: result.lang });
            });
        }),
);
let config = configGetAll();
config = {
    ...config,
    translations: {
        defaultLanguage: "pl",
        languages: ["pl", "en"],
        langChanged: () => {},
    },
};

configSet(config);

// fI18n.changeLanguage("pl");

addDecorator((story) => {
    return (
        <>
            <div className="w-panel-container">
                <div className="w-panel-body-container">
                    <div className="w-panel-body">
                        <I18nextProvider i18n={fI18n}>{story()}</I18nextProvider>
                    </div>
                </div>
            </div>

            <div id="modal-root" />
        </>
    );
});

require("./Panel/index.stories");
require("./Navbar/index.stories");
require("./CommandBar/index.stories");
require("./CommandMenu/index.stories");
require("./Download/index.stories");

require("./Icon/index.stories");
require("./LoadingIndicator/index.stories");
require("./Copyable/index.stories");
require("./FormFields/index.stories");
require("./FormBuilder/index.stories");

require("./Tabs/index.stories.tsx");
require("./Placeholder/index.stories");
require("./Overlays/Modal/index.stories");

require("./Overlays/Tooltip/index.stories");
// require("./FormFields/index.stories");
// require("./Tree/index.stories");
require("./Table/index.stories");
require("./filters/index.stories");
require("./Overlays/Shadow/index.stories");

require("./Overlays/ConfirmDialog/index.stories");
require("./Overlays/Positioner/index.stories");

require("./PrintContainer/index.stories");

require("./HotKeys/index.stories");

require("./BackofficePanel/index.stories");


require("./helpers/HeightAdjuster/index.stories");

/*

*/

// require("./fields/filesList.stories");
