import React, { useEffect } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import Text from "./Inputs/Text/Text";
import { Row } from "../Row";
import FormErrors from "./FormErrors/FormErrors";
import Switch from "./Inputs/Switch/Switch";
import Select from "./Inputs/Select/Select";
import { useSerenityForm } from "./useSerenityForm";
import Textarea from "./Inputs/Textarea/Textarea";
import Date from "./Inputs/Date/Date";
import CheckboxGroup from "./Inputs/CheckboxGroup/CheckboxGroup";
import { mockData } from "../DataGrid/__mocks__/MockUsers";
export default {
    title: "Form/Form 1",
    component: undefined,
    argTypes: {},
} as ComponentMeta<any>;

interface IUser {
    name: string;
    age: number;
    email: string;
    description: string;
    canEdit: boolean;
    date: string;
    friends: string[];
}

const Example = () => {
    const { field, setReadonly, reset, isReadOnly, setFieldErrors, setFormErrors, formErrors } = useSerenityForm<IUser>(
        {
            defaultValues: {
                name: "Super name",
                age: 11,
                email: "email@op.com",
                canEdit: true,
                description: "a very long text",
                date: "1982-11-20",
                friends: [],
            },
        },
    );
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
                    <CheckboxGroup
                        label={"Friends"}
                        {...field("friends")}
                        options={mockData.slice(0, 5).map((user) => ({ value: user.id, label: user.first_name }))}
                    />
                    <Date label={"Birth date"} {...field("date")} />
                </Row>
                <Row>
                    <Textarea label={"Description"} {...field("description")} style={{ height: 200 }} />
                </Row>
                <Row>
                    <div></div>
                    <div>
                        <button
                            onClick={() => {
                                //setFormErrors(["To jest błąd formularza", "To jest inny błąd formularza"]);
                                setFieldErrors("canEdit", ["To jest błąd pola"]);
                                //setReadonly(isReadOnly => !isReadOnly);
                                reset({ age: 1 });
                                //alert(JSON.stringify(form.getValues()));
                            }}
                            style={{ width: "100%" }}
                        >
                            Submit {}
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
