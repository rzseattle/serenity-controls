import * as React from "react";
import "./ConfirmDialog.sass";
import { confirmDialog, IConfirmModalProps } from "../ConfirmDialog";

export const alertDialog = async (message: string, options: Partial<IConfirmModalProps> = {}) => {
    options.showCancelLing = false;
    return confirmDialog(message, options);
};
