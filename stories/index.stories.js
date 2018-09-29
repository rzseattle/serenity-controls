import React from "react";
import { addDecorator } from "@storybook/react";
import { configSet } from "../src/lib/Config";
require("./Stories.sass");
import i18n from "../src/utils/I18n";
import { I18nextProvider } from "react-i18next"; // the initialized i18next instance

const config = {
    translations: {
        defaultLanguage: "pl",
        languages: ["pl", "en"],
        backendLangChanged: "/admin/changeLang/{{lng}}",
    },
};

configSet(config);

//i18n.changeLanguage("pl");

addDecorator((story) => (
    <>
        <I18nextProvider i18n={i18n}>
            <div className="w-panel-container">
                <div className="w-panel-body-container">
                    <div className="w-panel-body" >
                        {story()}
                    </div>
                </div>
            </div>
        </I18nextProvider>
        <div id="modal-root" />
    </>
));

require("./Panel/index.stories");
require("./LoadingIndicator/index.stories");
require("./Tabs/index.stories.tsx");
require("./LoadingContainer/index.stories");
require("./FormFields/index.stories");
require("./Overlays/Shadow/index.stories");
require("./Overlays/Modal/index.stories");
require("./Overlays/ConfirmDialog/index.stories");
require("./Overlays/Positioner/index.stories");

//require("./fields/filesList.stories");
