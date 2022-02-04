import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import Form2, { useSuperForm } from "./Form2";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Text from "./Inputs/Text/Text";

export default {
    title: "Form/Form 1",
    component: Form2,
    argTypes: {},
} as ComponentMeta<typeof Form2>;

interface IUser {
    name: string;
    age: number;
    email: string;
    canEdit: boolean;
}

const Example = () => {
    const { field,  setReadonly,register, ...form } = useSuperForm<IUser>({
        defaultValues: {
            name: "Super name",
            age: 11,
            email: "email@op.com",
            canEdit: true,
        },
    });

    //console.log(register("name"));
    return (
        <div>
            <button
                onClick={() => {
                    //form.
                    alert(JSON.stringify(form.getValues()));
                    setReadonly(true)
                }}
            >
                submit
            </button>

            <div>
                <input {...register("email")} onBlur={() => {}} />
                <input {...register("name")} />
                <Text label={"Wartość a"} {...field("email")} />
            </div>
        </div>
    );
};

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Form2> = (args) => {
    return <Example />;
};

export const StoryBasic = Template.bind({});
StoryBasic.args = {};
StoryBasic.storyName = "Form";
