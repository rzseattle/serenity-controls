import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { FieldProps } from "formik/dist/Field";
import { useRef } from "react";
const Form2 = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    return (
        <div>
            <h1>Any place in your app!</h1>
            <button onClick={() => {
                alert(JSON.stringify(ref.current.values, null, 2));
            }}>ok</button>
            <Formik
                innerRef={ref}
                initialValues={{ email: "", password: "", sub: { test: "aaaa" } }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}

            >
                <Form>
                    <Field type="text" name="email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="text" name="password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit">Submit</button>
                    <Text />
                </Form>
            </Formik>
        </div>
    );
};

const Text = () => {
    const formik = useFormikContext();

    return (
        <Field name={"sub.test"}>
            {({ field, form, meta }: FieldProps) => {
                return (
                    <input
                        type="text"
                        value={field.value}
                        name={field.name}

                        readOnly={meta.touched}
                        onChange={(e) => {
                            formik.setFieldValue(field.name, e.target.value);
                        }}
                    />
                );
            }}
        </Field>
    );
};

export default Form2;
