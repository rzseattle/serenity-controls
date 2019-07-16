import React, { useCallback, useState } from "react";

import "./DownloadButton.sass";
import { Icon } from "../Icon";
import { fI18n } from "../lib/I18n";
import { download, IDownloadSuccessParams } from "./Downloader";

interface IDownloadButtonProps {
    url: string;
    label?: string;
    downloadingLabel?: string;
    data?: any;
    onFinish?: (params: IDownloadSuccessParams) => any;
    mode?: "button" | "link" | "icon";

}

export const DownloadButton = ({
    url,
    data = {},
    label = fI18n.t("frontend:download"),
    onFinish = null,
    downloadingLabel = fI18n.t("frontend:downloading"),
    mode = "link",

}: IDownloadButtonProps) => {
    const [isLoading, setLoading] = useState(false);

    const downloadCallback = useCallback(() => {
        if (isLoading) {
            return;
        }
        setLoading(true);
        download(url, data).then((result) => {
            setLoading(false);
            if (onFinish !== null) {
                onFinish(result);
            }
        });
    }, [url]);

    return (
        <div className={"w-download-button" + (isLoading ? " w-download-button-disabled" : "")}>
            <a
                className={"  w-download-button-mode-" + mode + (mode == "button" ? " btn" : "")}
                onClick={downloadCallback}
            >
                <div className={"w-download-button-icon" + (isLoading ? " w-download-button-icon-spin" : "")}>
                    {/*{isLoading && <LoadingIndicator />}*/}
                    <Icon name={!isLoading ? "Download" : "Sync"} />
                </div>
                {mode !== "icon" && (
                    <div className="w-download-button-label"> {!isLoading ? label : downloadingLabel}</div>
                )}
            </a>
        </div>
    );
};
