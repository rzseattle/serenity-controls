import React from "react";
import { ControllerFieldState } from "react-hook-form";
import s from "./CommonInput.module.sass";
import { MdLiveHelp } from "react-icons/md";
import { IOption } from "../../../fields";

export interface IFieldPresentationValue {
    real: any;
    presented: string | number | string[] | number[] | IOption[];
}

export interface ICommonInputProps {
    label?: string;
    readOnlyPresenter?: (value: IFieldPresentationValue) => React.ReactNode;
    help?: string;
}

const CommonInput = ({
    children,
    label,
    fieldState,
    readonly,
    readOnlyPresenter,
    valueForPresenter,
    help,
}: {
    children?: React.ReactElement;
    fieldState: ControllerFieldState;
    valueForPresenter: () => IFieldPresentationValue;
    readonly: boolean;
} & ICommonInputProps) => {
    return (
        <div className={s.wCommonInput + (fieldState.invalid ? " " + s.inputInvalid : "")}>
            {label !== undefined && <label title={label}>{label}</label>}
            {readonly === true ? (
                <div className={s.wReadOnly} data-testid={"read-only"}>
                    {readOnlyPresenter !== undefined
                        ? readOnlyPresenter(valueForPresenter())
                        : typeof valueForPresenter().presented === "string" ||
                            typeof valueForPresenter().presented === "number"
                          ? (valueForPresenter().presented as string)
                          : "define value presenter for field"}
                </div>
            ) : (
                <div>{children}</div>
            )}
            {fieldState.invalid && (
                <div className={s.wFormErrors}>
                    {Object.values(fieldState.error.types).map((el, index) => (
                        <div key={index}>{el}</div>
                    ))}
                </div>
            )}
            {help && (
                <div className={s.wFieldHelp}>
                    <MdLiveHelp /> {help}
                </div>
            )}
        </div>
    );
};

export default CommonInput;
