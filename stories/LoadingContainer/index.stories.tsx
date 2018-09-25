import * as React from "react";
import { storiesOf } from "@storybook/react";

import { LoaderContainer } from "../../src/ctrl/LoaderContainer";
import { Datasource } from "../../src/lib/Datasource";
import PrintJSON from "../../src/utils/PrintJSON";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

storiesOf("Loading container & datasource", module)
    .addDecorator(withKnobs)
    .add("From URL", () => (
        <>
            <LoaderContainer
                datasource={Datasource.from("https://jsonplaceholder.typicode.com/users")}
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
    .add("From function", () => (
        <>
            <LoaderContainer
                datasource={Datasource.from(() => ({ test: "This is some test data" }))}
                debug={boolean("Debug", false)}
            >
                {(data) => <h1>{data.test}</h1>}
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
                <LoaderContainer datasource={Datasource.from(promise)} debug={boolean("Debug", false)}>
                    {(data) => <h1>{data.bar}</h1>}
                </LoaderContainer>
            </>
        );
    })
    .add("Combining many methods", () => {
        // creating promise
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                // returning URL to load
                resolve("https://jsonplaceholder.typicode.com/users");
            }, 1500);
        });
        // function returning promise
        const fn = () => promise;
        return (
            <>
                <LoaderContainer datasource={Datasource.from(fn)} debug={boolean("Debug", false)}>
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
                <LoaderContainer
                    datasource={Datasource.from(promise)}
                    debug={boolean("Debug", false)}
                    prerender={true}
                >
                    {(data) => {
                        if (data == null) {
                            return <div style={{padding: 100}}>This container loading data now</div>;
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
                    datasource={Datasource.from(promise)}
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
            <LoaderContainer datasource={Datasource.from("https://jsonplaceholder.typicode.com/users")} debug={true}>
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
