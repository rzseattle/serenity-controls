import { useForm } from "react-hook-form";
import { UseFormProps, UseFormReturn } from "react-hook-form/dist/types";
import { useState } from "react";
import { FieldPath } from "react-hook-form/dist/types/path";
import { Control } from "react-hook-form/dist/types/form";

interface IFieldProps<T, TContext extends object = object> {
    control: Control<T, TContext>;
    name: any;
}

interface ISuperForm<T, TContext extends object = object> extends UseFormReturn<T, TContext> {
    setFormErrors: (errors: string[]) => any;
    setFieldErrors: (name: FieldPath<T>, errors: string[]) => any;
    setReadonly: (readonly: boolean) => any;
    isReadOnly: boolean;
    field: (name: FieldPath<T>) => IFieldProps<T>;
    formErrors: string[];
}
export const useSerenityForm = <T,>(props?: UseFormProps<T, any>): ISuperForm<T> => {
    const form = useForm<T>(props);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [isReadOnly, setReadOnly] = useState<boolean>(false);

    return {
        ...form,
        setFormErrors: (errors) => {
            setFormErrors(errors);
        },
        formErrors,
        setFieldErrors: (name, errors) => {
            form.setError(name, { types: errors.reduce((p, c, index) => ({ ...p, [index]: c }), {}) });
        },
        setReadonly: (isReadOnly) => {
            setReadOnly(isReadOnly);
        },
        isReadOnly,
        field: (name) => {
            return {
                control: form.control,
                name,
                readonly: isReadOnly,
            };
        },
    };
};
