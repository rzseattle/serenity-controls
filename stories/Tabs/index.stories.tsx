import React from "react";
import { storiesOf } from "@storybook/react";

import { TabPane, Tabs } from "../../src/ctrl/Tabs";
import Panel from "../../src/ctrl/Panel";
// @ts-ignore
import { withKnobs, radios } from "@storybook/addon-knobs";
import { LoaderContainer } from "../../src/ctrl/LoaderContainer";
import { Datasource } from "../../src/lib/Datasource";

const options = {
    "Tab 1": "1",
    "Tab 2": "2",
};

const action = (info: string) => alert(info);

const text1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget
                    aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus
                    volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor
                    ultricies urna eu elementum. Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla.
                    Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit
                    amet enim vitae nisi placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris
                    aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin
                    orci.`;

const text2 = `Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt.
                    Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum
                    tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi
                    risus blandit sem, vel porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus.
                    Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae
                    sem pretium feugiat. Morbi posuere orci et felis placerat, et eleifend purus ultricies.`;

storiesOf("Tab", module)
    .add("Base", () => (
        <Panel>
            <Tabs>
                <TabPane title="Tab11">{text1}</TabPane>
                <TabPane title="Tab2">{text2}</TabPane>
            </Tabs>
        </Panel>
    ))
    .add("Icons", () => (
        <Panel>
            <Tabs>
                <TabPane title="Tab1" icon="DoubleChevronLeftMedMirrored">
                    {text1}
                </TabPane>
                <TabPane title="Tab2" icon="EditMirrored">
                    {text2}
                </TabPane>
            </Tabs>
        </Panel>
    ))
    .add("Badges", () => (
        <Panel>
            <Tabs>
                <TabPane title="Tab1" badge="1">
                    {text1}
                </TabPane>
                <TabPane title="Tab2" badge="2">
                    {text2}
                </TabPane>
            </Tabs>
        </Panel>
    ))
    .add("Default active tab", () => (
        <Panel>
            <Tabs defaultActiveTab={1}>
                <TabPane title="Tab1">{text1}</TabPane>
                <TabPane title="Tab2">{text2}</TabPane>
            </Tabs>
        </Panel>
    ))
    .addDecorator(withKnobs)
    .add("Controlled tabs", () => (
        <>
            <Panel>
                <Tabs activeTab={radios("Active tab", options, "1") - 1}>
                    <TabPane title="Tab1">{text1}</TabPane>
                    <TabPane title="Tab2">{text2}</TabPane>
                </Tabs>
            </Panel>
        </>
    ))
    .add("Cloaseable", () => (
        <Panel>
            <Tabs defaultActiveTab={1}>
                <TabPane title="Tab1" onClose={(index) => action("close clicked, index:" + index)}>
                    {text1}
                </TabPane>
                <TabPane title="Tab2" onClose={(index) => action("close clicked, index:" + index)}>
                    {text1}
                </TabPane>
            </Tabs>
        </Panel>
    ))
    .add("Mounted at start", () => {
        const fn = () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ date: new Date().toISOString() });
                }, 1000);
            });
        // todo nie działa jak należy

        return (
            <Panel>
                <h4>Without mount on start - tab render every time (default)</h4>
                <Tabs>
                    <TabPane title="Tab1">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                    <TabPane title="Tab2">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                    <TabPane title="Tab3">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                </Tabs>

                <h4>Mount all tabs on start</h4>
                <Tabs mountAllTabs={true}>
                    <TabPane title="Tab1">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                    <TabPane title="Tab2">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                    <TabPane title="Tab3">
                        <LoaderContainer promise={fn()}>{(data) => data.date}</LoaderContainer>
                    </TabPane>
                </Tabs>
            </Panel>
        );
    });
