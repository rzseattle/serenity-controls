import React from "react";
import { ControllerFieldState } from "react-hook-form/dist/types/controller";
import "./CommonInput.sass";

export interface IFieldPresentationValue {
    real: any;
    presented: string | number;
}

export interface ICommonInputProps {
    label?: string;
    readOnlyPresenter?: (value: IFieldPresentationValue) => React.ReactNode;
}

const CommonInput = ({
    children,
    label,
    fieldState,
    readonly,
    readOnlyPresenter,
    valueForPresenter,
}: {
    children?: React.ReactElement;
    fieldState: ControllerFieldState;
    valueForPresenter: () => IFieldPresentationValue;
    readonly: boolean;
} & ICommonInputProps) => {
    return (
        <div className={"w-common-input" + (fieldState.invalid ? " w-common-input-invalid" : "")}>
            {label !== undefined && <label title={label}>{label}</label>}
            {readonly === true ? (
                <div className="w-read-only">
                    {readOnlyPresenter !== undefined
                        ? readOnlyPresenter(valueForPresenter())
                        : valueForPresenter().presented}
                </div>
            ) : (
                <div>{children}</div>
            )}
            {fieldState.invalid && (
                <div className="w-field-errors">
                    {Object.values(fieldState.error.types).map((el, index) => (
                        <div key={index}>{el}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommonInput;