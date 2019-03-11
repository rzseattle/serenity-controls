import React from "react";
import { storiesOf } from "@storybook/react";

// @ts-ignore
import { Panel } from "../../../src/Panel";
import { Icon } from "../../../src/Icon";
import { IconsList } from "./IconsList";

storiesOf("Icon", module)
    .add("Base", () => {
        const iconsTable = IconsList.reduce((r, e, i) => {
            i % 5 === 0 ? r.push([e]) : r[r.length - 1].push(e);
            return r;
        }, []);

        const tdStyle = { verticalAlign: "middle", lineHeight: "24px", padding: 6 };

        return (
            <Panel>
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
            </Panel>
        );
    })
    .add("Size", () => {
        return (
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
        );
    });
