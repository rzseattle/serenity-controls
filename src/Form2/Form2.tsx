import { FormProvider, useController, useForm, useFormContext } from "react-hook-form";
import { FieldPath } from "react-hook-form/dist/types/path";

const Form2 = () => {
    return (
        <>
            <Form2HookForm />
        </>
    );
};

interface IFormValues {
    a: string;
    b: string;
}

const Form2HookForm = () => {
    const methods = useForm<IFormValues>({
        defaultValues: {
            a: null,
            b: null,
        },
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        setError,
    } = methods;
    const onSubmit = (data: IFormValues) => console.log(data);

    console.log("rendering form");

    return (
        <FormProvider {...methods}>
            <button
                onClick={() => {
                    setError("a", { type: "required" });
                }}
            >
                error !
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormBody<IFormValues>>
                    <input type="text" {...register("a")} />
                    <Text name={"z"} />
                    <Text name={"a.b.0"} />
                    <input type="submit" />
                </FormBody>
            </form>
        </FormProvider>
    );
};

const FormBody = <T,>({ children }: { children: React.ReactElement<T>[] }) => {
    return children;
};

const CommonInput = ({ children }: { children: React.ReactElement }) => {
    return (
        <div>
            <label>This is label</label>
            {children}
        </div>
    );
};

const Text = <Value,>({ name }: { name: FieldPath<Value> }) => {
    const { register, control, setValue } = useFormContext(); // retrieve all hook methods

    // field: { onChange, onBlur, name, value, ref },
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }

    const { field, fieldState, formState } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: "",
    });

    console.log("rendering input");

    return (
        <CommonInput>
            <input value={field.value} onChange={(e) => setValue(name, e.target.value)} />
        </CommonInput>
    );
};

export default Form2;
