import * as React from "react";
import ReactDOM from "react-dom";

import { confirmDialog, IConfirmDialogCompProps } from "../ConfirmDialog";
import ConfirmDialogComp from "../ConfirmDialog/ConfirmDialog";

export const alertDialog = async (message: string, options: Partial<IConfirmDialogCompProps> = {}) => {
    return new Promise((resolve) => {
        const wrapper = document.body.appendChild(document.createElement("div"));

        const cleanup = () => {
            ReactDOM.unmountComponentAtNode(wrapper);
            wrapper.remove();
        };

        const x: any = (
            <ConfirmDialogComp
                title={undefined}
                question={message}
                onSelect={(val) => {
                    cleanup();
                    resolve(val);
                }}
                onAbort={() => {
                    cleanup();
                    resolve(undefined);
                }}
                options={[{ value: true, label: "ok" }]}
                {...options}
            />
        );

        ReactDOM.render(x, wrapper);
    });
};
