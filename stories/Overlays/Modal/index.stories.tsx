import React from "react";
import { storiesOf } from "@storybook/react";
import Panel from "../../../src/ctrl/Panel";
import Shadow from "../../../src/ctrl/overlays/Shadow";

import "./Modal.stories.sass";
import { Modal } from "../../../src/ctrl/overlays/Modal";
import { MoreTextHelper } from "./MoreTextHelper";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;

storiesOf("Modal", module)
    .add("Base", () => (
        <Modal show={true} width={400} height={400}>
            {text}
        </Modal>
    ))
    .add("Positioning", () => (
        <>
            <Modal show={true} left={0} top={0} width={500}>
                {text}
            </Modal>
            <Modal show={true} bottom={0} right={0}>
                {text}
            </Modal>
            <Modal show={true} top={100} right={100} width={200}>
                {text}
            </Modal>
        </>
    ))
    .add("Reposition on size change", () => (
        <Modal show={true}>
            {text}
            <hr />
            <MoreTextHelper text={text} />
        </Modal>
    ))
    .add("Disabled reposiotion on size change", () => (
        <Modal show={true} recalculatePosition={false}>
            {text}
            <hr />
            <MoreTextHelper text={text} />
        </Modal>
    ))
    .add("With title", () => (
        <Modal show={true} title={"Test title"}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("With close link", () => (
        <Modal show={true} title={"Test title"} showHideLink={true}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Icon", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} icon={"Mail"}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Without shadow", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} icon={"Mail"} shadow={false}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Without shadow and back layer", () => (
        <Modal show={true} title={"Test title"} showHideLink={true} icon={"Mail"} shadow={false} layer={false}>
            <div style={{ padding: 10 }}>{text}</div>
        </Modal>
    ))
    .add("Relative positioning", () => (
        <div>
            To będzie to
            <Modal show={true} title={"Test title"} showHideLink={true} icon={"Mail"} shadow={false} layer={false}>
                <div style={{ padding: 10 }}>{text}</div>
            </Modal>
        </div>
    ));
