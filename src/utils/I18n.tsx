import * as i18n from "i18next";
// import * as LanguageDetector from "i18next-browser-languagedetector";
import {reactI18nextModule} from "react-i18next";

import {configGet} from "frontend/src/lib/Config";
import Comm from "../lib/Comm";

declare var PRODUCTION: any;

const XHR = {
    type: "backend",
    init(services, backendOptions, i18nextOptions) {
        /* use services and options */
    },
    read(language, namespace, callback) {
        import( "../../../../build/js/lang/i18." + language + ".ts" ).then(function(result) {
            if (result.lang[namespace] == undefined) {
                callback("Undefined namespace", null);
            } else {
                callback(null, result.lang[namespace]);
            }
        });
    },
    readMulti(languages, namespaces, callback) {
        throw new Error("Unsupported I18n readMulti");
    },
    // only used in backends acting as cache layer
    save(language, namespace, data) {
        // store the translations
    },
    create(languages, namespace, key, fallbackValue) {
        /* save the missing translation */
    },
};

const instance = i18n
    .use(XHR)
    // .use(LanguageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: configGet("translations.defaultLanguage"),
        debug: !PRODUCTION,
        saveMissing: true,
        ns: [
            "translation",
            "frontend",
        ],
        missingKeyHandler(lng, ns, key, fallbackValue) {
            if(!PRODUCTION) {
                console.log("to jest key: " + key);
                console.log("to jest wartość: " + fallbackValue);
                console.log("to jest ns: " + ns);
                console.log("to jest lang: " + lng);
            }
        },
        react: {
            wait: true,
        },
    });​

instance.on("languageChanged", function(lng) {

    Comm._get(configGet("translations.backendLangChanged").replace("{{lng}}", lng));
});
const fI18n = instance;
export { fI18n };

export default instance;
