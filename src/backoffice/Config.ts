import { deepExtend } from "../lib/JSONTools";
import { IFileViewerProps } from "../FileListField";

import { ImageViewer } from "../viewers/ImageViewer";
import { PDFViewer } from "../viewers/PDFViewer";

interface IConfig {
    translations: {
        defaultLanguage: string;
        languages: string[];
        langChanged: (langCode: string) => any;
    };
    files: {
        viewerRegistry: Array<{ filter: RegExp; viewer: React.ComponentType<IFileViewerProps> }>;
        transformFilePath: (path: string) => string;
    };
}

const config: IConfig = {
    translations: {
        defaultLanguage: "pl",
        languages: [],
        langChanged: (langCode) => {
            // Comm._get("/admin/changeLang/" + langCode);
            alert("provide lang change action");
        },
    },
    files: {
        transformFilePath: (path: string) => {
            let baseUrl = "";
            if (window.location.host.indexOf("esotiq") != -1) {
                baseUrl = "https://static.esotiq.com/";
            }

            if (path.charAt(0) != "/") {
                path = "/" + path;
            }
            return baseUrl + path;
        },
        viewerRegistry: [
            {
                filter: /.(jpg|jpeg|png|gif)$/i,
                viewer: ImageViewer,
            },
            {
                filter: /.(pdf)$/i,
                viewer: PDFViewer,
            },
        ],
    },
};

export const configGetAll = (): IConfig => config;

export const configSet = (newConfig: any) => {
    deepExtend(config, newConfig);
};
