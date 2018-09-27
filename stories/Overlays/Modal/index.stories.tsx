import React from "react";
import { storiesOf } from "@storybook/react";
import Panel from "../../../src/ctrl/Panel";
import Shadow from "../../../src/ctrl/overlays/Shadow";

import "./Modal.stories.sass";
import { Modal } from "../../../src/ctrl/overlays/Modal";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;
storiesOf("Modal", module)
    .add("Base", () => <Modal show={true} width={400} height={400}>{text}</Modal>)
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
    ));
//.add("Base", () => <Modal show={true}>{text}</Modal>)
//.add("Base", () => <Modal show={true}>{text}</Modal>)
