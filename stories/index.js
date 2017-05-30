import React from 'react';
import {storiesOf, action, linkTo} from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import {TabPane, Tabs} from '../src/ctrl/Tabs';
import {Timeline, TimelineItem} from '../src/ctrl/Timeline';
import {Modal} from "../src/ctrl/Overlays";



require('./Stories.sass');

storiesOf('Welcome', module)
    .add('to Storybook', () => (
        <Welcome showApp={linkTo('Button')}/>
    ));
storiesOf('Button', module)
    .add('with text', () => (
        <Button onClick={action('clicked')}>Hello Button</Button>
    ))
    .add('with some emoji', () => (
        <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
    ));

storiesOf('Tab', module)
    .add('Podstawka', () => (
        <Tabs>
            <TabPane tab="Tab11">

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum. Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
                placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.
            </TabPane>
            <TabPane tab="Tab2">
                Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
                Morbi posuere orci et felis placerat, et eleifend purus ultricies.
            </TabPane>
        </Tabs>
    ))
    .add('Ikony', () => (
        <Tabs>

            <TabPane tab="Tab1" icon="check">


                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum. Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
                placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.
            </TabPane>
            <TabPane tab="Tab2" icon="share">
                Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
                Morbi posuere orci et felis placerat, et eleifend purus ultricies.
            </TabPane>
        </Tabs>
    ))
    .add('Badges', () => (
        <Tabs>
            <TabPane tab="Tab1" badge="1">


                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vestibulum molestie nibh eget aliquet. Morbi a magna molestie, laoreet mi vitae, suscipit mi. Sed pulvinar massa eros, faucibus volutpat tellus placerat ut. Proin dictum mauris quis risus pretium varius. Donec porttitor ultricies urna eu elementum. Sed ullamcorper sapien mi, sed dignissim magna fermentum fringilla. Suspendisse consequat mauris tristique metus ullamcorper, sed ultricies magna tincidunt. Aenean sit amet enim vitae nisi
                placerat convallis vel id velit. Mauris placerat lacus ex, vel tincidunt mauris aliquet ut. Etiam molestie imperdiet est at hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed vitae orci euismod, rhoncus libero nec, sollicitudin orci.
            </TabPane>
            <TabPane tab="Tab2" badge="2">
                Aliquam tincidunt enim nec diam sagittis aliquam. Phasellus ultricies nunc at iaculis tincidunt. Morbi dui nisl, interdum quis porttitor tincidunt, interdum vel quam. Pellentesque ac ipsum tristique, ornare tellus nec, lacinia est. Pellentesque viverra, diam at aliquam vestibulum, nisi risus blandit sem, vel porttitor odio augue eu risus. Nunc sollicitudin vitae libero a dapibus. Etiam nec imperdiet lectus. Vestibulum facilisis augue at viverra auctor. Proin maximus tortor vitae sem pretium feugiat.
                Morbi posuere orci et felis placerat, et eleifend purus ultricies.
            </TabPane>
        </Tabs>
    ))

storiesOf('Timeline', module)
    .add('Podstawka', () => (
        <div style={{padding: '10px'}}>
            <Timeline>
                <TimelineItem head="2017-01-02">Tutaj treść</TimelineItem>
                <TimelineItem head="2017-01-02">Tutaj treść</TimelineItem>
            </Timeline>
        </div>

    ))
    .add('Kolory', () => (
        <div style={{padding: '10px'}}>
            <Timeline>
                <TimelineItem color="red" head="2017-01-02 [admin@admin.com]">Tutaj treść 1</TimelineItem>
                <TimelineItem color="green" head="2017-01-02">Tutaj treść</TimelineItem>
            </Timeline>
        </div>

    ))