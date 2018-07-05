import * as React from "react";

interface IIconProps {
    json: object;
}

const PrintJSON: React.StatelessComponent<IIconProps> = (props) => {
    return <pre onClick={() => console.log(props.json)}>{JSON.stringify(props.json, null, 2)}</pre>;
};

export default PrintJSON;
export { PrintJSON };
