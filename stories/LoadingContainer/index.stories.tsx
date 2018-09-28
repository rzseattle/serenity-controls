import * as React from "react";
import { storiesOf } from "@storybook/react";

import { LoaderContainer } from "../../src/ctrl/LoaderContainer";
import { Datasource } from "../../src/lib/Datasource";
import PrintJSON from "../../src/utils/PrintJSON";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import Comm from "../../src/lib/Comm";

storiesOf("Loading container", module)
    .addDecorator(withKnobs)
    .add("From URL", () => (
        <>
            <LoaderContainer
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
            </LoaderContainer>
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
                <LoaderContainer promise={promise} debug={boolean("Debug", false)}>
                    {(data) => <h1>{data.bar}</h1>}
                </LoaderContainer>
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
                <LoaderContainer promise={promise} debug={boolean("Debug", false)} prerender={true}>
                    {(data) => {
                        if (data == null) {
                            return <div style={{ padding: 100 }}>This container loading data now</div>;
                        }
                        return <h1>{data.bar}</h1>;
                    }}
                </LoaderContainer>
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
                <LoaderContainer
                    promise={promise}
                    debug={boolean("Debug", false)}
                    indicatorText={"Custom loading text"}
                >
                    {(data) => <h1>{data.bar}</h1>}
                </LoaderContainer>
            </>
        );
    })
    .add("Debug", () => (
        <>
            <LoaderContainer promise={Comm._get("https://jsonplaceholder.typicode.com/users")} debug={true}>
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
            </LoaderContainer>
        </>
    ));
