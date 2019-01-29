import React from 'react';
import { storiesOf } from '@storybook/react'
import Panel from '../../src/ctrl/common/Panel';
import {GalleryBase} from './galery';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

storiesOf('FilesLists', module)
    .addDecorator(withKnobs)
    .addWithInfo(
        'Galery', "",

        () => (
            <Panel>

                <GalleryBase/>

            </Panel>
        ))