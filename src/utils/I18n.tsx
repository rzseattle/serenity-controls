import * as i18n from "i18next";
// import * as LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import { configGet } from "../lib/Config";
import Comm from "../lib/Comm";

declare var PRODUCTION: any;

const XHR = {
    type: "backend",
    init(services, backendOptions, i18nextOptions) {
        /* use services and options */
    },
    read(language, namespace, callback) {
      import("../../translations/i18n.pl").then(function(result) {
      //  import("../../../../build/js/lang/i18." + language + ".ts").then(function(result) {
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
        //debug: !PRODUCTION,
        debug: false,
        saveMissing: true,
        ns: ["translation", "frontend"],
        missingKeyHandler(lng, ns, key, fallbackValue) {
            if (!PRODUCTION) {
                console.log(`i18n  key: ${key}, value: ${fallbackValue}, ns: ${ns}, lang: ${lng}`);
            }
        },
        react: {
            wait: true,
        },
    });
instance.on("languageChanged", (lng) => {
    Comm._get(configGet("translations.backendLangChanged").replace("{{lng}}", lng));
});
const fI18n = instance;
export { fI18n };

export default instance;
