import React from 'react';
import {storiesOf} from '@storybook/react'
import Panel from '../../src/ctrl/Panel';
import {Table} from '../../src/ctrl/Table';

const importInfo = `
        ~~~js
        import {Table} from "frontend/lib/ctrl/Table"
        
        const columns = [
                {
                    field: 'id',
                    filter: {
                        type: 'NumericFilter',
                    }
                },
                {field: 'email'},
                {
                    field: 'first_name',
                    template: (field, row) => div{row.first_name} {row.last_name}/div ,
                    events: {
                        click: [ (row, column, event ) =>{ alert(row[column.field] + ' Cell:' + event.target) } ],
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
                    field: 'price',
                    class: 'right',
                    prepend: ' - ',
                    append: ' $',
                    filter: {
                        type: 'NumericFilter',
                    }

                },
            ]
        
        
         ~~~
         `;

const server = 'http://localhost:3001';

storiesOf('Table', module)
    .addWithInfo(
        'Base', importInfo,

        () => {
            const columns = [
                {
                    field: 'id',
                    filter: {
                        type: 'NumericFilter',
                    }
                },
                {field: 'email'},
                {
                    field: 'first_name',
                    template: (field, row) => <div>{row.first_name} {row.last_name}</div> ,
                    events: {
                        click: [ (row, column, event ) =>{ alert(row[column.field] + ' Cell:' + event.target) } ],
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
                    field: 'price',
                    class: 'right',
                    prepend: ' - ',
                    append: ' $',
                    filter: {
                        type: 'NumericFilter',
                    }

                },
            ]

            return <Panel>
                <Table
                    remoteURL={server + '/table/base'}
                    columns={columns}
                >

                </Table>

            </Panel>
        }
    )
