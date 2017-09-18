import ReactDOM from 'react-dom'
import React from 'react'
import PanelComponentLoader from './src/lib/PanelComponentLoader'

require('./styles/App.sass')
require('./src/lib/react-helper.js');
//import {AppContainer} from 'react-hot-loader';



global.ReactDOM = ReactDOM;
global.React = React;


ReactHelper.register('PanelComponentLoader', PanelComponentLoader);


ReactHelper.initComponents();


if (module.hot) {
    module.hot.accept();
}

import {Comments, CommentItem} from './src/ctrl/Comments'
import {CheckboxGroup, Select, Switch, Text, Textarea} from './src/ctrl/Fields'
import {DateFilter, MultiFilter, SelectFilter, NumericFilter, TextFilter, SwitchFilter} from './src/ctrl/Filters'
import {Modal, Shadow, withPortal} from './src/ctrl/Overlays'
import {Tabs, TabPane} from './src/ctrl/Tabs'
import {Timeline, TimelineItem} from './src/ctrl/Timeline'

export {
    Comments, CommentItem,
    CheckboxGroup, Select, Switch, Text, Textarea,
    DateFilter, MultiFilter, SelectFilter, NumericFilter, TextFilter, SwitchFilter,
    Modal, Shadow, withPortal,
    Tabs, TabPane,
    Timeline, TimelineItem

}
