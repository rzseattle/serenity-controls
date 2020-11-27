import React from "react";
import { storiesOf } from "@storybook/react";
import { PrintContainer } from "../../../../src/PrintContainer";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum.
        Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
        placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.

        Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel
        porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
        Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;

storiesOf("Helpers/Print container", module)
    .add(
        "Base",

        () => (
            <div>
                <PrintContainer>
                    <div className="w-print-page-a4 w-print-page-a4-horizontal">{text}</div>
                </PrintContainer>
            </div>
        ),
    )
    //.add("No padding", () => <Panel noPadding={true}>{text}</Panel>)
    //.add("Title", () => <Panel title="Panel title ">{text}</Panel>);

/*    .add("Toolbar", () => (
        <Panel
            title="Panel title"
            toolbar={
                <>
                    <a href="" className="btn btn-default btn-xs">
                        Button 1
                    </a>
                    <a href="" className="btn btn-primary btn-xs">
                        Button 2
                    </a>
                </>
            }
        >
            {text}
        </Panel>
    ))*/
