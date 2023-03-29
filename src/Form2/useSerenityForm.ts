
import { useForm, Control, FieldPath, UseFormProps, UseFormReturn  } from "react-hook-form";
import { useState } from "react";


interface IFieldProps<T, TContext extends object = object> {
    control: Control<T, TContext>;
    name: string;
    readonly: boolean;
}

export interface ISuperForm<T, TContext extends object = object> extends UseFormReturn<T, TContext> {
    setFormErrors: (errors: string[]) => any;
    setFieldErrors: (name: FieldPath<T>, errors: string[]) => any;
    setReadonly: (readonly: boolean | ((prevState: boolean) => boolean)) => any;
    isReadOnly: boolean;
    field: (name: FieldPath<T>) => IFieldProps<T>;
    formErrors: string[];
    setSubmitting: (state: boolean) => any;
}

export interface ISerenityFormProps<T> extends UseFormProps<T> {
    isReadOnly?: boolean;
}

export const useSerenityForm = <T>(props?: ISerenityFormProps<T>): ISuperForm<T> => {
    const form = useForm<T>(props);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isReadOnly, setReadonly] = useState<boolean>(props?.isReadOnly ?? false);
    const [isSubmitting, setSubmitting] = useState<boolean>(false);

    return {
        ...form,
        setFormErrors: (errors) => {
            setFormErrors(errors);
        },
        formErrors,
        setFieldErrors: (name, errors) => {
            form.setError(name, { types: errors.reduce((p, c, index) => ({ ...p, [index]: c }), {}) });
        },
        setReadonly,
        isReadOnly,
        field: (name) => {
            return {
                control: form.control,
                name,
                readonly: isReadOnly,

            };
        },
        setSubmitting: (submitting: boolean) => {
            setSubmitting(submitting);
        },
        formState: { ...form.formState, isSubmitting },
    };
};
