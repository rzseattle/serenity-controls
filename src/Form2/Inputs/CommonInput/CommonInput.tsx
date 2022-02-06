import { ControllerFieldState } from "react-hook-form/dist/types/controller";
import "./CommonInput.sass";

export interface ICommonInputProps {
    label?: string;
}

const CommonInput = ({
    children,
    label,
    fieldState,
}: { children?: React.ReactElement; fieldState: ControllerFieldState } & ICommonInputProps) => {
    return (
        <div className={"w-common-input" + (fieldState.invalid ? " w-common-input-invalid" : "")}>
            <label>{label}</label>
            <div>{children}</div>
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
