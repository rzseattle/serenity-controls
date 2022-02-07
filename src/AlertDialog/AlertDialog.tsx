import * as React from "react";

import { confirmDialog, IConfirmDialogCompProps } from "../ConfirmDialog";

export const alertDialog = async (message: string, options: Partial<IConfirmDialogCompProps> = {}) => {
    return confirmDialog(message, options);
};
