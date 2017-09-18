import * as React from 'react'
import {IColumnData, IEventCallback, ICellTemplate} from './Interfaces';
import {Option} from '../fields/Interfaces';


export class ColumnHelper {
    data: IColumnData;

    constructor(initData) {
        this.data = {
            events: {
                'click': [],
                'enter': [],
                'leave': [],
                'mouseUp': [],
            },
            filter: {},
            ...initData
        };
    }

    static id(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right')

    }

    static number(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right')

    }

    static map(field: string, caption: string, options: Array<Option> | object): ColumnHelper {

        return new ColumnHelper({
            field: field,
            caption: caption,
            template: value => options[value],
            filter: {
                type: 'SelectFilter',
                content: options
            }
        });
    }

    static text(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: {
                type: 'TextFilter',
            }
        })
    }

    static link(field: string, caption: string, urlResolver: any): ColumnHelper {

        return ColumnHelper.text('id', '')
            .onMouseUp((row, column, e: React.MouseEvent<HTMLElement>) => {
                    let url = urlResolver(row, column, event);
                    if (e.button == 1) {
                        window.open(url);
                    } else {
                        window.location.href = url;
                    }
                }
            )

    }

    static money(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: (val, row) => parseFloat(val).toFixed(2),
            filter: {
                type: 'NumericFilter',
            }
        }).className('right');
    }

    static email(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: (val, row) => <a href={'mailto:' + val}>{val}</a>,
            filter: {
                type: 'TextFilter',
            }
        })
    }

    static date(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            icon: 'fa-calendar',
            filter: {
                type: 'DateFilter',
            }
        });
    }

    static bool(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            classTemplate: (row, column) => ['center', (row[column.field] == '1' ? 'darkgreen' : 'darkred')],
            template: value => <i className={'fa fa-' + (value == 1 ? 'check' : 'times')}></i>,
            filter: {
                type: 'SwitchFilter',
                content: {0: 'Nie', 1: 'Tak'},
            }

        })
    }

    static hidden(field): ColumnHelper {
        return new ColumnHelper({
            field: field,
            display: false
        });
    }

    static template(caption: string, template: ICellTemplate): ColumnHelper {
        return new ColumnHelper({
            template: template
        }).noFilter();
    }

    static custom(data): ColumnHelper {
        return new ColumnHelper(data);
    }

    className(className): ColumnHelper {
        this.data.class = className;
        return this;
    }

    template(fn: ICellTemplate): ColumnHelper {
        this.data.template = fn;
        return this;
    }

    append(x: any): ColumnHelper {
        this.data.append = x;
        return this;
    }

    prepend(x: any): ColumnHelper {
        this.data.prepend = x;
        return this;
    }

    width(x: any): ColumnHelper {
        this.data.width = x;
        return this;
    }

    noFilter(): ColumnHelper {
        this.data.filter = null;
        return this;
    }


    /*filter(type, field, conf) {
        if(Array.isArray(this.data.filter)){

        }else{

        }
    }*/

    onClick(fn: IEventCallback): ColumnHelper {
        this.data.events.click.push(fn);
        return this;
    }

    onMouseUp(fn: IEventCallback): ColumnHelper {
        this.data.events.mouseUp.push(fn);
        return this;
    }

    onEnter(fn: IEventCallback): ColumnHelper {
        this.data.events.enter.push(fn);
        return this;
    }

    onLeave(fn: IEventCallback): ColumnHelper {
        this.data.events.leave.push(fn);
        return this;
    }

    set(el): ColumnHelper {
        this.data = {...this.data, ...el};
        return this;
    }

    get(): IColumnData {
        return this.data;
    }
}


