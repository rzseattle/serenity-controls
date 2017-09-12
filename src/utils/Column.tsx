import * as React from 'react'

interface Option {
    value: string;
    label: string;
}

interface IColumnTemplate<T> {
    (value: string, row: T, column: object): string | JSX.Element
}

interface IEventCallback {
    (row: any, column: object, event: object)
}

interface IColumnData {
    field: string,
    caption: string,
    isSortable: boolean,
    display: boolean,
    toolTip: IColumnTemplate<any>,
    width: number | string | null,
    class: Array<string>,
    type: string,
    orderField: string,
    icon: string | JSX.Element,
    append: string | JSX.Element,
    prepend: string | JSX.Element,
    classTemplate: () => Array<string>,
    styleTemplate: () => Array<string>,
    template: IColumnTemplate<any>,
    default: string,
    events: {
        click: Array<IEventCallback>,
        mouseUp: Array<IEventCallback>,
        enter: Array<IEventCallback>,
        leave: Array<IEventCallback>
    },
    filter: {
        type: string,
        field: string
    }
}



export class Column {
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

    static id(field: string, caption: string): Column {
        return new Column({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right')

    }

    static number(field: string, caption: string): Column {
        return new Column({
            field: field,
            caption: caption,
            filter: {
                type: 'NumericFilter',
            }
        }).className('right')

    }

    static map(field: string, caption: string, options: Array<Option> | object): Column {

        return new Column({
            field: field,
            caption: caption,
            template: value => options[value],
            filter: {
                type: 'SelectFilter',
                content: options
            }
        });
    }

    static text(field: string, caption: string): Column {
        return new Column({
            field: field,
            caption: caption,
            filter: {
                type: 'TextFilter',
            }
        })
    }

    static link(field: string, caption: string, urlResolver: any): Column {

        return Column.text('id', '')
            .onMouseUp((row, column, e: MouseEvent) => {
                    let url = urlResolver(row, column, event);
                    if (e.button == 1) {
                        window.open(url);
                    } else {
                        window.location.href = url;
                    }
                }
            )

    }

    static money(field, caption): Column {
        return new Column({
            field: field,
            caption: caption,
            template: (val, row) => parseFloat(val).toFixed(2),
            filter: {
                type: 'NumericFilter',
            }
        }).className('right');
    }

    static email(field, caption): Column {
        return new Column({
            field: field,
            caption: caption,
            template: (val, row) => <a href={'mailto:' + val}>{val}</a>
        })
    }

    static date(field, caption): Column {
        return new Column({
            field: field,
            caption: caption,
            icon: 'fa-calendar',
            filter: {
                type: 'DateFilter',
            }
        });
    }

    static bool(field, caption): Column {
        return new Column({
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

    static hidden(field): Column {
        return new Column({
            field: field,
            display: false
        });
    }

    static template(caption, template: IColumnTemplate<any>): Column {
        return new Column({
            template: template
        }).noFilter();
    }

    static custom(data): Column {
        return new Column(data);
    }

    className(className): Column {
        this.data.class = className;
        return this;
    }

    template(fn: IColumnTemplate<any>): Column {
        this.data.template = fn;
        return this;
    }

    append(x: any): Column {
        this.data.append = x;
        return this;
    }

    prepend(x: any): Column {
        this.data.prepend = x;
        return this;
    }

    width(x: any): Column {
        this.data.width = x;
        return this;
    }

    noFilter(): Column {
        this.data.filter = null;
        return this;
    }


    /*filter(type, field, conf) {
        if(Array.isArray(this.data.filter)){

        }else{

        }
    }*/

    onClick(fn: IEventCallback): Column {
        this.data.events.click.push(fn);
        return this;
    }

    onMouseUp(fn: IEventCallback): Column {
        this.data.events.mouseUp.push(fn);
        return this;
    }

    onEnter(fn: IEventCallback): Column {
        this.data.events.enter.push(fn);
        return this;
    }

    onLeave(fn: IEventCallback): Column {
        this.data.events.leave.push(fn);
        return this;
    }

    set(el): Column {
        this.data = {...this.data, ...el};
        return this;
    }

    get(): IColumnData {
        return this.data;
    }
}


