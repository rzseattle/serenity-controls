import React from "react";
import { addDecorator } from "@storybook/react";
import { configSet } from "../src/backoffice/Config";
import "./Stories.sass";
import { fI18n, langContainer } from "../src/lib";

import { I18nextProvider } from "react-i18next"; // the initialized i18next instance

langContainer.add("pl", () => import("../src/translations/i18n.pl"));

const config = {
    translations: {
        defaultLanguage: "pl",
        languages: ["pl", "en"],
        backendLangChanged: "/admin/changeLang/{{lng}}",
    },
};

configSet(config);

// i18n.changeLanguage("pl");

addDecorator((story) => {
    return (
        <>
            <I18nextProvider i18n={fI18n}>
                <div className="w-panel-container">
                    <div className="w-panel-body-container">
                        <div className="w-panel-body">{story()}</div>
                    </div>
                </div>
            </I18nextProvider>
            <div id="modal-root" />
        </>
    );
});

require("./Panel/index.stories");
require("./LoadingIndicator/index.stories");
require("./FormFields/index.stories");

require("./Tabs/index.stories.tsx");
require("./Placeholder/index.stories");
require("./Overlays/Modal/index.stories");
// require("./FormFields/index.stories");
require("./Table/index.stories");
require("./filters/index.stories");
require("./Overlays/Shadow/index.stories");

require("./Overlays/ConfirmDialog/index.stories");
require("./Overlays/Positioner/index.stories");

/*
    
*/

// require("./fields/filesList.stories");
