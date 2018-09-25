import { deepExtend } from "./JSONTools";

const config = {
    translations: {
        defaultLanguage: "pl",
        languages: [],
        backendLangChanged: "/admin/changeLang/{{lng}}",
    },
};

export const configGet = (path: string, fallbackVal: any = null) => {
    const result = fetchFromObject(config, path);
    return result != undefined ? result : fallbackVal;
};

export const configSet = (newConfig: any) => {
    deepExtend(config, newConfig);
};

function fetchFromObject(obj: any, key: string): any {
    key = key !== undefined ? key : "";

    if (typeof obj === "undefined") {
        return undefined;
    }

    const index = key.indexOf(".");

    if (index > -1) {
        return fetchFromObject(obj[key.substring(0, index)], key.substr(index + 1));
    }

    return obj[key];
}
