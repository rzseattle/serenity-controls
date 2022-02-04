import { FormProvider, useForm } from "react-hook-form";
import { Row } from "../Row";
import Text from "./Inputs/Text/Text";
import { UseFormProps, UseFormReturn } from "react-hook-form/dist/types";
import { useState } from "react";
import { FieldPath } from "react-hook-form/dist/types/path";
import { value } from "../DataGrid/parts/Addons/GridConditionsPresenter/GridConditionsPresenter.module.sass";
import { Control } from "react-hook-form/dist/types/form";

interface IFormValues {
    a: string;
    b: string;
}

interface IFieldProps<T, TContext extends object = object> {
    control: Control<T, TContext>;
    name: any;
}

interface ISuperForm<T, TContext extends object = object> extends UseFormReturn<T, TContext> {
    setFormErrors: (errors: string[]) => any;
    setReadonly: (readonly: boolean) => any;
    field: (name: FieldPath<T>) => IFieldProps<T>;
}
export const useSuperForm = <T,>(props?: UseFormProps<T, any>): ISuperForm<T> => {
    const form = useForm<T>(props);
    const setFormErrors = useState<string[]>([]);
    const setReadOnly = useState<boolean>(false);

    return {
        ...form,
        setFormErrors: (errors) => {
            setFormErrors[1](errors);
        },
        setReadonly: (isReadOonly) => {
            setReadOnly[1](isReadOonly);
        },
        field: (name) => {
            return {
                control: form.control,
                name,
                readonly: setReadOnly[0]
            };
        },
    };
};

export interface IForm2Props<T, TContext extends object = object> {
    form: ISuperForm<T, TContext>;
}

const Form2 = <T,>(props: IForm2Props<T>) => {
    const onSubmit = (data: T) => {
        console.log(data);
    };

    //const [errors, setErrors] = useState<FormError>([])
    console.log("rendering form");
    console.log(errors[null]);

    return (
        <FormProvider {...props.form}>
            <button
                onClick={() => {
                    props.form.setError("a", {
                        types: {
                            0: "To jest error",
                            1: "To jest cos innego",
                        },
                        message: "",
                    });

                    props.form.setError(null, {
                        types: {
                            0: "To jest error",
                            1: "To jest cos innego",
                        },
                        message: "",
                    });
                }}
            >
                error !
            </button>
            <br />
            <form onSubmit={props.form.handleSubmit(onSubmit)}>
                <div style={{ width: 400 }}>
                    <Row>
                        <Text<IFormValues> label={"Wartość b"} name={"b"} />
                        <Text<IFormValues> label={"Wartość a"} name={"a"} />
                    </Row>
                </div>
                <input type="submit" />
            </form>
        </FormProvider>
    );
};

export default Form2;
