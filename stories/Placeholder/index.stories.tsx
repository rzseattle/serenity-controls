import * as React from "react";
import { storiesOf } from "@storybook/react";

import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import {Comm} from "../../src/ctrl/lib";
import {Placeholder} from "../../src/ctrl/common";

storiesOf("Loading container", module)
    .addDecorator(withKnobs)
    .add("From URL", () => (
        <>
            <Placeholder
                promise={Comm._get("https://jsonplaceholder.typicode.com/users")}
                debug={boolean("Debug", false)}
            >
                {(data) => (
                    <ul>
                        {data.map((el: any) => (
                            <li key={el.id}>
                                {el.name}, email
                                {el.email}{" "}
                            </li>
                        ))}
                    </ul>
                )}
            </Placeholder>
        </>
    ))

    .add("From promise", () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ bar: "foo" });
            }, 1500);
        });
        return (
            <>
                <Placeholder promise={promise} debug={boolean("Debug", false)}>
                    {(data) => <h1>{data.bar}</h1>}
                </Placeholder>
            </>
        );
    })

    .add("Prerender", () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ bar: "foo" });
            }, 1500);
        });
        return (
            <>
                <Placeholder promise={promise} debug={boolean("Debug", false)} prerender={true}>
                    {(data) => {
                        if (data == null) {
                            return <div style={{ padding: 100 }}>This container loading data now</div>;
                        }
                        return <h1>{data.bar}</h1>;
                    }}
                </Placeholder>
            </>
        );
    })
    .add("Custom loading text", () => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ bar: "foo" });
            }, 1500);
        });
        return (
            <>
                <Placeholder
                    promise={promise}
                    debug={boolean("Debug", false)}
                    indicatorText={"Custom loading text"}
                >
                    {(data) => <h1>{data.bar}</h1>}
                </Placeholder>
            </>
        );
    })
    .add("Debug", () => (
        <>
            <Placeholder promise={Comm._get("https://jsonplaceholder.typicode.com/users")} debug={true}>
                {(data) => (
                    <ul>
                        {data.map((el: any) => (
                            <li key={el.id}>
                                {el.name}, email
                                {el.email}{" "}
                            </li>
                        ))}
                    </ul>
                )}
            </Placeholder>
        </>
    ));
