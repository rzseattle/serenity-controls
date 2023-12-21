import * as React from "react";

import { IConfirmDialogCompProps } from "../ConfirmDialog";
import ConfirmDialogComp from "../ConfirmDialog/ConfirmDialog";
import { createRoot } from "react-dom/client";

export const alertDialog = async (message: string, options: Partial<IConfirmDialogCompProps> = {}) => {
    return new Promise((resolve) => {
        const wrapper = document.body.appendChild(document.createElement("div"));

        const cleanup = () => {
            const root = createRoot(wrapper);
            root.unmount();
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

        const root = createRoot(wrapper);
        root.render(x);
    });
};
