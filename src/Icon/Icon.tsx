import * as React from "react";

export interface IIconProps {
    name: string;
    size?: number;
}

export const Icon = React.memo((props: IIconProps) => {
    if (props.size !== undefined) {
        let add: any = {};
        add = { style: { fontSize: props.size } };
        return <i className={"ms-Icon ms-Icon--" + props.name} {...add} aria-hidden="true" />;
    }
    return <i className={"ms-Icon ms-Icon--" + props.name} aria-hidden="true" />;
});
