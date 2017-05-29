import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import Welcome from './Welcome';
import {Tabs, TabPane} from "../src/ctrl/Tabs";

require('../sass/App.sass');

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('Tabs', module)
  .add('Basic', () =>
    <Tabs>
        <TabPane tab="Title 1">Content 1</TabPane>
        <TabPane tab="Title 2">Content 2</TabPane>
    </Tabs>

  )
