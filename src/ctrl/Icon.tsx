import * as React from "react";


interface IIconProps {
    name: string;

}

const Icon: React.StatelessComponent<IIconProps> = (props) => {
    return (
        <i className={"ms-Icon ms-Icon--" + props.name} aria-hidden="true" />
    );
};

export default Icon;
