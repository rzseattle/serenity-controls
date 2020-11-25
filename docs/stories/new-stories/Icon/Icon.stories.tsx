// @ts-ignore

//
// import { Icon, IIconProps } from "../../../../src/Icon";
//
// storiesOf("Icon", module)
//     .add("Base", () => {
//         const iconsTable = IconsList.reduce((r, e, i) => {
//             i % 5 === 0 ? r.push([e]) : r[r.length - 1].push(e);
//             return r;
//         }, []);
//
//         const tdStyle = { verticalAlign: "middle", lineHeight: "24px", padding: 6 };
//
//         return (
//             <Panel>

//             </Panel>
//         );
//     })
//     .add("Size", () => {
//         return (

//         );
//     });

import React from "react";

import { Story, Meta } from "@storybook/react/types-6-0";

import { IconsList } from "./IconsList";
import { Icon, IIconProps } from "../../../../src/Icon";

export default {
    title: "Controls/Icon",
    component: Icon,
    argTypes: {
        name: {
            name: "name",
            type: { name: "string", required: false },
            defaultValue: "Add",
            control: {
                type: "text",
            },
        },
    },
} as Meta;

const Template: Story<IIconProps> = (args) => {
    return <Icon {...args} />;
};

export const Template1 = Template.bind({});
Template1.storyName = "Basic";
Template1.args = {};

const TemplateSize: Story<Record<string, unknown>> = (args) => {
    return (
        <div>
            <>
                <Icon name="Pinned" size={6} />
                <br />
                <Icon name="Pinned" size={12} />
                <br />
                <Icon name="Pinned" size={24} />
                <br />
                <Icon name="Pinned" size={52} />
                <br />
                <Icon name="Pinned" size={104} />
                <br />
            </>
        </div>
    );
};
export const TemplateSizeEl = TemplateSize.bind({});
TemplateSizeEl.storyName = "Size";
TemplateSizeEl.args = {};

const TemplateList: Story<Record<string, unknown>> = (args) => {
    const iconsTable = IconsList.reduce((r, e, i) => {
        i % 5 === 0 ? r.push([e]) : r[r.length - 1].push(e);
        return r;
    }, []);

    const tdStyle = { verticalAlign: "middle", lineHeight: "24px", padding: 6 };
    return (
        <div>
            <table>
                <tbody>
                    {iconsTable.map((row, index) => {
                        return (
                            <tr key={index}>
                                {row.map((icon: string) => (
                                    <td style={tdStyle} key={icon}>
                                        <Icon name={icon} size={24} /> {icon}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export const TemplateListEL = TemplateList.bind({});
TemplateListEL.storyName = "List";
TemplateListEL.args = {};
