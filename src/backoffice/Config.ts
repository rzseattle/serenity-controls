import { deepExtend } from "../lib/JSONTools";
import { IFile, IFileViewerProps } from "../FileListField";

import { ImageViewer } from "../viewers/ImageViewer";
import { PDFViewer } from "../viewers/PDFViewer";

export interface IConfig {
    translations: {
        defaultLanguage: string;
        currentLanguage: string;
        languages: string[];
        langChanged: (langCode: string) => any;
    };
    files: {
        viewerRegistry: Array<{ filter: RegExp; viewer: React.ComponentType<IFileViewerProps> }>;
        transformFilePath: (file: IFile) => string;
    };
}

let config: IConfig = {
    translations: {
        defaultLanguage: "pl",
        currentLanguage: "pl",
        languages: [],
        langChanged: (langCode) => {
            console.error("provide lang change action");
        },
    },
    files: {
        transformFilePath: (file: IFile) => {
            let path = file.path;
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

export const configGetAll = (): IConfig => {
    return config;
};

export const configSet = (newConfig: any) => {
    config = newConfig;
};
