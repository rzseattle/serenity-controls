import * as React from "react";

import { confirmDialog } from "../overlays";
import ColumnHelper from "../Table/ColumnHelper";
import { Icon } from "../common";
import { Comm } from "../lib";

export class BackOfficeColumnHelper extends ColumnHelper {
    static goto;

    static goToEdit(gotoTarget: { (row: any): string }): ColumnHelper {
        return new ColumnHelper({
            caption: "",
            template: () => <Icon name={"Edit"} />,
        })

            .noFilter()
            .className("center")
            .onClick((row) => {
                BackOfficeColumnHelper.goto(gotoTarget(row));
            })
            .width(50);
    }

    static performDelete(
        gotoTarget: { (row: any): string },
        confirmMessage: { (row: any): string },
        onSuccess: { (row: any): any },
    ): ColumnHelper {
        return new ColumnHelper({
            caption: "",
            template: () => <Icon name={"Delete"} />,
        })
            .noFilter()
            .className("center darkred")
            .onClick((row) => {
                confirmDialog(confirmMessage(row), {
                    title: "Czy jesteś pewien ?",
                    showHideLink: false,
                }).then(() => {
                    Comm._get(gotoTarget(row), {}, () => onSuccess(row));
                });
            })
            .width(50);
    }
}
