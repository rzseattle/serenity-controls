let baseUrl = "";
if (window.location.host.indexOf("esotiq") != -1) {
    baseUrl = "https://static.esotiq.com/";
}

export const parsePath = (path: string) => {
    if (path.charAt(0) != "/") {
        path = "/" + path;
    }
    return baseUrl + path;
};

export const isImage = (path: string) => {
    return path.match(/.(jpg|jpeg|png|gif)$/i);
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
