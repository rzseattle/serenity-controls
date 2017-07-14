import React from 'react';
import {storiesOf} from '@storybook/react'
import Panel from '../../src/ctrl/Panel';
import {Table} from '../../src/ctrl/Table';
import {Tooltip} from '../../src/ctrl/Overlays';

const columnOptions = {
    'field': null,
    'caption': 'inData.caption == undefined ? inData.field : inData.caption',
    'isSortable': true,
    'display': true,
    'toolTip': null,
    'width': null,
    'class': [],
    'type': 'Simple',
    'orderField': null,
    'icon': null,
    'append': null,
    'prepend': null,
    'classTemplate': () => [],
    'styleTemplate': () => [],
    'template': null,
    'default': '',
    'events': {
        'click': [],
        'enter': [],
        'leave': []
    },
    'filter': {
        'type': 'TextFilter',
        'field': 'inData.field'
    }
};


const baseColumns = [
    {
        field: 'id',
        filter: {
            type: 'NumericFilter',
        }
    },
    {field: 'email'},
    {
        field: 'first_name',
        template: (field, row) => <div>{row.first_name} {row.last_name}</div>,
        events: {
            click: [(row, column, event) => {
                alert(row[column.field] + ' Cell:' + event.target)
            }],
        },
        filter: [
            {
                type: 'TextFilter',
                field: 'first_name',
                caption: 'First name',
                title: 'First name'
            },
            {
                type: 'TextFilter',
                field: 'last_name',
                caption: 'Last name',
                title: 'Last name'
            }
        ]


    },
    {
        field: 'last_name',
        display: false
    },
    {
        field: 'gender',
        filter: {
            type: 'SelectFilter',
            field: 'gender',
            content: {
                '0': 'All',
                'Female': 'Female',
                'Male': 'Male',
            },
            multiselect: true
        }
    },
    {
        field: 'ip_address',
        class: 'right'
    },
    {
        field: 'date',
        icon: 'fa-calendar',
        filter: {
            type: 'DateFilter',
        }
    },
    {
        field: 'date',

        filter: {
            field: 'active',
            type: 'SwitchFilter',
            content: {0: 'Nie', 1: 'Tak'}
        }
    },
    {
        field: 'price',
        class: 'right',
        prepend: ' - ',
        append: ' $',
        classTemplate: (row, column) => [parseFloat(row.price) < 100 ? 'darkgreen' : 'darkred'],
        styleTemplate: (row, column) => parseFloat(row.price) < 100 ? {fontSize: '10px'} : {fontSize: '15px'},
        filter: {
            type: 'NumericFilter',
        }

    },
]

const importInfo = `
        ~~~js
        import {Table} from "frontend/lib/ctrl/Table"
        
            <pre>` + JSON.stringify(columnOptions) + `</pre>
            <pre>` + JSON.stringify(baseColumns) + `</pre>
            
        
         ~~~
`;

const server = 'http://localhost:3001';


class BaseTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltipTrigger: null,
            tooltipContent: ''
        };

        baseColumns[1].events = {
            enter: [(row, column, event) => {
                this.setState({
                    tooltipTrigger: event.target,
                    tooltipContent: row.ip_address
                })
            }]
        };
    }

    render() {
        return <Panel>
            <Table
                remoteURL={server + '/table/base'}
                columns={baseColumns}
            >

            </Table>
            <Tooltip placement="top" target={this.state.tooltipTrigger}>
                {this.state.tooltipContent}
            </Tooltip>

        </Panel>
    }
}

storiesOf('Table', module)
    .addWithInfo(
        'Base', importInfo,

        () => <BaseTable/>
    )
