import * as React from "react";

const PrintJSON = ({ json }: { json: object | string }) => {
    if (typeof json === "string") {
        json = JSON.parse(json);
    }

    return <pre onClick={() => console.log(json)}>{JSON.stringify(json, null, 2)}</pre>;
};

export { PrintJSON };
