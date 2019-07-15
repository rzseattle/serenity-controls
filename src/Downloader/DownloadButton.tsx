import React, { useCallback, useState } from "react";
import { LoadingIndicator } from "../LoadingIndicator";

import "./DownloadButton.sass";
import { Icon } from "../Icon";
import { fI18n } from "../lib/I18n";
import { download, IDownloadSuccessParams } from "./Downloader";

interface IDownloadButtonProps {
    url: string;
    label?: string;
    data?: any;
    onFinish?: (params: IDownloadSuccessParams) => any;
}

export const DownloadButton = ({
    url,
    data = {},
    label = fI18n.t("frontend:download"),
    onFinish = null,
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
        <>
            <a
                className={"btn w-download-button" + (isLoading ? " w-download-button-disabled" : "")}
                onClick={downloadCallback}
            >
                <div className="w-download-button-icon">
                    {isLoading && <LoadingIndicator />}
                    {!isLoading && <Icon name="Download" />}
                </div>
                <div className="w-download-button-label"> {label}</div>
            </a>
        </>
    );
};
