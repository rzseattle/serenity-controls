import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

export interface ITextProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    onChange: (val: any) => any;
    control: Control;
}

const Text = (props: ITextProps) => {
    const control = useController({ name: props.name, control: props.control });
    return (
        <input
            type="text"
            readOnly={props.readonly}
            onChange={(e) => {
                control.field.onChange({ target: { value: e.target.value } });
            }}
            value={control.field.value}
            style={{ backgroundColor: "yellow" }}
        />
        // <CommonInput label={props.label} fieldState={fieldState}>
        //     <input
        //         disabled={props.readonly}
        //         value={field.value ?? ""}
        //         onFocus={() => setFocus(props.name)}
        //         onChange={(e) => {
        //             setValue(props.name as string, e.target.value);
        //         }}
        //         {...register(props.name)}
        //     />
        // </CommonInput>
    );
};

export default Text;
