import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";

import { useController } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

export interface ITextProps extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
}

const Text = (props: ITextProps) => {
    const control = useController({ name: props.name, control: props.control });

    return (
        <CommonInput label={props.label} fieldState={control.fieldState}>
            {props.readonly ? (
                <div className="w-read-only">{control.field.value}</div>
            ) : (
                <input
                    type="text"
                    readOnly={props.readonly}
                    {...props.control.register(props.name)}
                    onChange={(e) => {
                        control.field.onChange({ target: { value: e.target.value } });
                    }}
                    value={control.field.value}
                    onBlur={() => {
                        control.field.onBlur();
                    }}
                />
            )}
        </CommonInput>
        //
        //     <input
        //         disabled={props.readonly}
        //         value={field.value ?? ""}
        //         onFocus={() => setFocus(props.name)}
        //         onChange={(e) => {
        //             setValue(props.name as string, e.target.value);
        //         }}
        //         {...register(props.name)}
        //     />
        //
    );
};

export default Text;
