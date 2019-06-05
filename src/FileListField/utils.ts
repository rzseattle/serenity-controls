import { configGetAll } from "../backoffice/Config";
import { IFile, IFileViewerProps } from "./FileListsField";
import { ImageViewer } from "../../lib/viewers/ImageViewer";

export const globalTransformFilePath = configGetAll().files.transformFilePath;

export const isImage = (path: string): boolean => {
    return path && path.match(/.(jpg|jpeg|png|gif)$/i) !== null;
};

export const formatBytes = (bytes: number) => {
    if (bytes < 1024) {
        return bytes + " Bytes";
    } else if (bytes < 1048576) {
        return (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes < 1073741824) {
        return (bytes / 1048576).toFixed(2) + " MB";
    } else {
        return (bytes / 1073741824).toFixed(2) + " GB";
    }
};

export const getViewer = (file: IFile): React.ComponentType<IFileViewerProps> => {
    let ViewerComponent: React.ComponentType<IFileViewerProps> = null;
    for (const element of configGetAll().files.viewerRegistry) {
        if ((file.name && file.name.match(element.filter)) || file.path.match(element.filter)) {
            ViewerComponent = element.viewer;
            break;
        }
    }
    if(ViewerComponent === null){
        return ImageViewer;
    }

    return ViewerComponent;
};
