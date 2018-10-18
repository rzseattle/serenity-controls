import React from "react";
import { storiesOf } from "@storybook/react";

import { Panel } from "../../../src/Panel";
import { Shadow } from "../../../src/Shadow";
import Tooltip from "../../../src/Tooltip/Tooltip";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;
storiesOf("Tooltip", module)
    .add("Base", () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "Leanne Graham",
                    username: "Bret",
                    email: "Sincere@april.biz",
                    address: {
                        street: "Kulas Light",
                        suite: "Apt. 556",
                        city: "Gwenborough",
                        zipcode: "92998-3874",
                        geo: {
                            lat: "-37.3159",
                            lng: "81.1496",
                        },
                    },
                });
            }, 2500);
        });
        return (
            <Panel>
                Lorem ipsum dolor sit amet,{" "}
                <Tooltip content={"This is content"} loadingIndicatorText="Data is loading">
                    <a>consectetur</a>
                </Tooltip>{" "}
                adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae,
                suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut.{" "}
                <Tooltip
                    theme="light"
                    content={promise}
                    loadingIndicatorText="Data is loading"
                    template={(data) => {
                        return (
                            <>
                                <b>{data.name}</b>
                                <hr />
                                <small>
                                    {data.address.street}
                                    <br />
                                    {data.address.zipcode}
                                    <br />
                                </small>
                            </>
                        );
                    }}
                >
                    <a>Proin</a>
                </Tooltip>{" "}
                dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum. Sed ullamcorper
                sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus
                ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi placerat convallis vel id
                velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at
                hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed
                vitae orci euismod, rhoncus libero nec, sollicitudin orci. Aliquam tincidunt enim nec diam sagittis
                aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor
                tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est.
                Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel porttitor odio augue eu
                risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue
                at viverra auctor. Proin maximus tortor vitae sem pretium feugiat. Morbi posuere orci et felis placerat,
                et eleifend purus ultricies
            </Panel>
        );
    })
    .add("With loading indicator", () => (
        <Panel>
            <Shadow showLoadingIndicator={true} />
            {text}
        </Panel>
    ))
    //
    .add("Custom class", () => (
        <Panel>
            <Shadow showLoadingIndicator={true} customClass={"w-shadow-custom-class1"} />
            {text}
        </Panel>
    ))
    .add("With loading indicator text", () => (
        <Panel>
            <Shadow showLoadingIndicator={true} showLoadingIndicatorText={"Content is now loading"} />
            {text}
        </Panel>
    ))
    .add("With custom content", () => (
        <Panel>
            <Shadow>
                <div style={{ backgroundColor: "white", color: "balck", padding: 20 }}>
                    This is text on shadow layer
                </div>
            </Shadow>
            {text}
        </Panel>
    ));
