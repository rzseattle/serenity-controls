import * as React from 'react'
import {ICellTemplate, IColumnData, IEventCallback} from './Interfaces';
import {Option} from '../fields/Interfaces';
import {DateFilter, NumericFilter, SelectFilter, SwitchFilter, TextFilter} from '../Filters';
import {IFilter} from 'frontend/src/ctrl/filters/Intefaces';
import Icon from 'frontend/src/ctrl/Icon';


export class ColumnHelper {
    protected data: IColumnData;

    constructor(initData: Partial<IColumnData>) {
        this.data = {
            events: {
                'click': [],
                'enter': [],
                'leave': [],
                'mouseUp': [],
            },
            filter: [],
            header: {},
            ...initData
        };
    }

    static id(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: [{
                caption: caption,
                field: field,
                component: NumericFilter,
            }]
        }).className('right')

    }

    static number(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: [{
                caption: caption,
                field: field,
                component: NumericFilter,
            }]
        }).className('right')

    }

    static map(field: string, caption: string, options: Array<Option> | object, multiSelectFilter: boolean = false): ColumnHelper {

        return new ColumnHelper({
            field: field,
            caption: caption,
            template: value => {
                if (Array.isArray(options)) {
                    let res = options.filter(e => e.value == value);
                    if (res.length > 0) {
                        return res[0].label;
                    }
                    return "---";
                } else {
                    return options[value]
                }
            },
            filter: [{
                field: field,
                component: SelectFilter,
                config: {
                    content: options,
                    multiselect: multiSelectFilter
                }
            }]
        });
    }

    static text(field: string, caption: string): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            filter: [{
                caption: caption,
                //label: caption,
                field: field,
                component: TextFilter,
            }]
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
            filter: [{
                field: field,
                component: NumericFilter,
            }]
        }).className('right');
    }

    static email(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            template: (val, row) => <a href={'mailto:' + val}>{val}</a>,
            filter: [{
                field: field,
                component: TextFilter,
            }]
        })
    }

    static date(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            icon: 'fa-calendar',
            filter: [{
                field: field,
                component: DateFilter,
            }]
        });
    }

    static bool(field, caption): ColumnHelper {
        return new ColumnHelper({
            field: field,
            caption: caption,
            classTemplate: (row, column) => ['center', (row[column.field] == '1' ? "darkgreen" : "darkred")],
            template: value => <Icon name={(value == "1" ? "CheckMark" : "Clear")}/>,
            filter: [{
                field: field,
                component: SwitchFilter,
                config: {
                    content: [
                        {value: 0, label: "Nie"},
                        {value: 1, label: "Tak"},
                    ],
                }
            }]

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
            caption: caption,
            template: template
        }).noFilter();
    }

    static custom(data): ColumnHelper {
        return new ColumnHelper(data);
    }

    className(className: string): ColumnHelper {
        this.data.class = [className];
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

    headerTooltip(text: string) {
        this.data.header.tooltip = text;
        return this;
    }

    headerIcon(iconName: string) {
        this.data.header.icon = iconName;
        this.data.filter[0].caption = "xx";
        return this;
    }

    addFilter(filter: IFilter) {
        this.data.filter.push(filter);
        return this;
    }

    noFilter(): ColumnHelper {
        this.data.filter = [];
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

    styleTemplate(fn: { (row: any, column: IColumnData): any }) {
        this.data.styleTemplate = fn;
        return this;
    }

    classTemplate(fn: { (row: any, column: IColumnData): Array<string> }) {
        this.data.classTemplate = fn;
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


