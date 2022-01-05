import React, { useRef, useState } from "react";
import { storiesOf } from "@storybook/react";

import "./Modal.stories.sass";
import { MoreTextHelper } from "./MoreTextHelper";
import { Comm } from "../../../../../src/lib";
import { Modal } from "../../../../../src/Modal";
import { RelativePositionPresets } from "../../../../../src/Positioner";
import { Placeholder } from "../../../../../src/Placeholder";
import { CommonIcons } from "../../../../../src/lib/CommonIcons";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;

storiesOf("Overlays/Modal", module)
    .add("Base", () => (
        <Modal show={true} width={400} height={400}>
            {text}
        </Modal>
    ))
    .add("Positioning", () => (
        <>
            <Modal show={true} position={{ bottom: 0, right: 0 }} width={500}>
                <h4>Modal 1</h4>
                {text}
            </Modal>
            <Modal show={true} position={{ top: 0, right: 0 }}>
                <h4>Modal 2</h4>
                {text}
            </Modal>
            <Modal show={true} position={{ top: 100, right: 100, bottom: 200 }} width={300} height={"100%"}>
                <div style={{ overflow: "auto" }}>
                    <h4>Modal 3</h4>
                    {text}
                </div>
            </Modal>
        </>
    ))
    .add("Reposition on size change", () => (
        <Modal show={true} width={600}>
            <div style={{ padding: 10 }}>
                {text}
                <hr />
                <MoreTextHelper text={text} />
            </div>
        </Modal>
    ))
    .add("Disabled reposiotion on size change", () => (
        <Modal show={true} recalculatePosition={false} width={600}>
            <div style={{ padding: 10 }}>
                {text}
                <hr />
                <MoreTextHelper text={text} />
            </div>
        </Modal>
    ))
    .add("With title", () => (
        <Modal show={true} title={"Test title"} width={600}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("With close link", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} width={600}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Icon", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} icon={CommonIcons.mail} width={600}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Without shadow", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} icon={CommonIcons.mail} shadow={false} width={600}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Without shadow and back layer", () => (
        <Modal
            show={true}
            title={"Test title"}
            showHideLink={true}
            icon={CommonIcons.search}
            shadow={false}
            layer={false}
            width={600}
        >
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Relative positioning", () => {
        const [opened, setOpened] = useState(false);
        const buttonRef = useRef<HTMLAnchorElement>();

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                // returning URL to load
                Comm._get("https://jsonplaceholder.typicode.com/users").then((result) => {
                    resolve(result);
                });
            }, 1500);
        });
        return (
            <>
                <a
                    className={"btn btn-primary"}
                    onClick={() => setOpened(true)}
                    ref={buttonRef}
                    style={{ marginLeft: 200 }}
                >
                    Open modal
                </a>

                <Modal
                    show={opened}
                    onHide={() => setOpened(false)}
                    animation={"from-up"}
                    shadow={false}
                    width={400}
                    relativeTo={() => buttonRef.current}
                    relativeSettings={RelativePositionPresets.bottomLeft}
                >
                    <div style={{ padding: 10 }}>
                        <Placeholder promise={promise} loadingIndicator={true}>
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
                    </div>
                </Modal>
            </>
        );
    });
