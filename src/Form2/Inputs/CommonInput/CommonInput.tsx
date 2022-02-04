import { ControllerFieldState } from "react-hook-form/dist/types/controller";
import { PrintJSON } from "../../../PrintJSON";

export interface ICommonInputProps {
    label?: string;
}

const CommonInput = ({
    children,
    label,
    fieldState,
}: { children?: React.ReactElement; fieldState: ControllerFieldState } & ICommonInputProps) => {
    return (
        <div>
            <label>{label}</label>
            {children}
            {fieldState.invalid && <div><PrintJSON json={fieldState.error.types} /></div>}

        </div>
    );
};

export default CommonInput;
