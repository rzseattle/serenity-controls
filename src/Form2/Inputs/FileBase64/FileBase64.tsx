import CommonInput, { ICommonInputProps } from "../CommonInput/CommonInput";
import { Control, useController } from "react-hook-form";

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result + "");
        reader.onerror = (error) => reject(error);
    });

export interface IFileBase64Props extends ICommonInputProps {
    name?: string;
    value?: string;
    readonly?: boolean;
    control: Control<any, any>;
}

const FileBase64 = (props: IFileBase64Props) => {
    const control = useController({ name: props.name, control: props.control });

    return (
        <CommonInput
            label={props.label}
            fieldState={control.fieldState}
            readonly={props.readonly}
            readOnlyPresenter={props.readOnlyPresenter}
            valueForPresenter={() => ({ real: control.field.value, presented: "" /*control.field.value*/ })}
        >
            <input
                type={"file"}
                onChange={async (e) => {
                    const file = e.currentTarget.files[0];
                    const content = (await toBase64(file)).split(",")[1];
                    control.field.onChange({
                        target: {
                            value: [
                                {
                                    name: file.name,
                                    title: file.name,
                                    size: file.size,
                                    mime: file.type,
                                    key: "",
                                    uploaded: false,
                                    content,
                                },
                            ],
                        },
                    });
                }}
            />
        </CommonInput>
    );
};

export default FileBase64;
