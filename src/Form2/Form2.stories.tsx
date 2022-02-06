import React, { useEffect } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import Text from "./Inputs/Text/Text";
import { useSerenityForm } from "./Form2";
import { Row } from "../Row";
import FormErrors from "./FormErrors/FormErrors";
import Switch from "./Inputs/Switch/Switch";
import Select from "./Inputs/Select/Select";

export default {
    title: "Form/Form 1",
    component: undefined,
    argTypes: {},
} as ComponentMeta<any>;

interface IUser {
    name: string;
    age: number;
    email: string;
    canEdit: boolean;
}

const Example = () => {
    const { field, setReadonly, isReadOnly, setFieldErrors, setFormErrors, formErrors, ...form } =
        useSerenityForm<IUser>({
            defaultValues: {
                name: "Super name",
                age: 11,
                email: "email@op.com",
                canEdit: true,
            },
        });
    useEffect(() => {}, []);

    //console.log(register("name"));
    return (
        <div>
            <div style={{ width: 500 }}>
                {formErrors.length > 0 && (
                    <Row>
                        <FormErrors errors={formErrors} />
                    </Row>
                )}

                <Row>
                    <Text label={"Name"} {...field("name")} />
                    <Text label={"Email"} {...field("email")} />
                </Row>
                <Row>
                    <Select
                        label={"Age"}
                        {...field("age")}
                        options={Array(50)
                            .fill(null)
                            .map((_, i) => ({ value: i, label: "Age " + i }))}
                    />
                    <Switch
                        label={"Can edit"}
                        {...field("canEdit")}
                        options={[
                            { value: false, label: "no" },
                            { value: true, label: "yes" },
                        ]}
                    />
                </Row>
                <Row>
                    <div></div>
                    <div>
                        <button
                            onClick={() => {
                                //setFormErrors(["To jest błąd formularza", "To jest inny błąd formularza"]);
                                setFieldErrors("canEdit", ["To jest błąd pola"]);
                                setReadonly(!isReadOnly);
                                //alert(JSON.stringify(form.getValues()));
                            }}
                            style={{ width: "100%" }}
                        >
                            Submit
                        </button>
                    </div>
                </Row>
            </div>
        </div>
    );
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<any> = (args) => {
    return <Example />;
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Form";
