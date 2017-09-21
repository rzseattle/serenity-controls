import * as React from "react";
import * as ReactDOM from 'react-dom';
import {IFilterContext, IFilterValue} from "frontend/src/ctrl/table/Interfaces";

import '../../../react-dates/lib/css/_datepicker.css'

let moment;
let locale;
let datePicker;

interface IFilterProps {
    field: string
    caption: string
    /**Filters container for keep focus etc */
    container?: any
    onChange?: { (filterValue: IFilterValue): any }
    config?: any
}

interface IFilterComponent {
    //todo
    //FILTER_INTERFACE_TEST?: boolean

}

class AbstractFilter extends React.Component<IFilterProps, any> {

}


class DateFilter extends AbstractFilter implements IFilterComponent {
    public FILTER_INTERFACE_TEST: boolean = true;
    timepicker: any;
    datepicker: any;


    constructor(props) {
        super(props)

        this.state = {
            startDate: null,
            endDate: null,
            startTime: null,
            endTime: null,
            libsLoaded: false,
            choiceType: 'range' // exists, not-exists
        }

        this.datepicker = null;
        this.timepicker = null;
    }

    componentWillMount() {

        Promise.all([
            import('moment'),
            import('moment/locale/pl'),
            import('react-dates'),

        ]).then(imported => {
            [moment, locale, datePicker/*, timePicker*/] = imported;
            this.setState({
                startDate: moment(),
                endDate: moment(),
                startTime: moment().startOf('day'),
                endTime: moment().endOf('day'),
                libsLoaded: true
            });
        });


    }

    handleApply() {

        this.setState({show: false});
        let dateStart = this.state.startDate.format('YYYY-MM-DD');
        let timeStart = this.state.startTime.format('HH:mm:ss');
        let dateStop = this.state.endDate.format('YYYY-MM-DD');
        let timeStop = this.state.endTime.format('HH:mm:ss');

        let separatorI = '<i class="fa fa-arrow-right"></i>';
        let calendarI = ''; //'<i class="fa fa-calendar-o"></i>';
        let clockI = '<i class="fa fa-clock-o"></i>';

        let val = `${dateStart} ${timeStart} : ${dateStop} ${timeStop}`;
        let label = `${calendarI} ${dateStart} ${clockI} ${timeStart} ${separatorI} ${calendarI} ${dateStop} ${clockI} ${timeStop}`;
        if (timeStart == '00:00:00' && timeStop == '23:59:59')
            label = `${dateStart} ${separatorI} ${dateStop}`;

        let applyVal: string | Array<string> = "";
        let condition: string;


        if (this.state.choiceType == 'range') {
            condition = "<x<in";
            applyVal = val;
        } else if (this.state.choiceType == 'exists') {
            condition = ">";
            applyVal = '0000-00-00 00:00:00';
            label = 'Data ustalona';
        } else if (this.state.choiceType == 'not-exists') {
            condition = "IN";
            applyVal = ['0000-00-00 00:00:00', null, ''];
            label = "Data nie ustalona";
        }

        this.props.onChange({
            field: this.props.field,
            value: applyVal,
            condition: condition,
            caption: this.props.caption,
            labelCaptionSeparator: ":",
            label: label
        });


    }

    render() {

        if (this.state.libsLoaded == false) {
            return <div className={'w-filter w-filter-date'}>
                <div><i className="fa fa-cog fa-spin"></i></div>
            </div>
        }


        let s = this.state;
        return (
            <div className={'w-filter w-filter-date'}>

                <div style={{display: (s.choiceType != 'range' ? 'none' : 'block')}}>
                    <i className="fa fa-calendar-o"></i>
                    <datePicker.DateRangePicker
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
                        focusedInput={this.state.focusedInput}
                        onFocusChange={focusedInput => {
                            if (focusedInput == null) {
                                this.props.container.focus()
                            }
                            this.setState({focusedInput});
                        }}
                        startDatePlaceholderText="Data od"
                        endDatePlaceholderText="Data do"
                        minimumNights={0}
                        isOutsideRange={() => {
                            return false
                        }}
                        onPrevMonthClick={(e) => {

                            this.props.container.focus();
                            setTimeout(() => {
                                this.props.container.focus();
                            }, 250)
                        }}
                        onNextMonthClick={() => {
                            this.props.container.focus();
                            setTimeout(() => {
                                this.props.container.focus();
                            }, 250)
                        }}
                        renderCalendarInfo={() => false}
                    />
                </div>
                <div className="w-filter-date-exists">
                    <div>
                        <label>
                            <input checked={s.choiceType == 'range'} onChange={e => this.setState({choiceType: 'range'})} type="checkbox"/><i className="fa fa-arrows-h"></i> Według wybou
                        </label>
                    </div>
                    <div>
                        <label>
                            <input checked={s.choiceType == 'exists'} onChange={e => this.setState({choiceType: 'exists'})} type="checkbox"/><i className="fa fa-check"></i> Data ustalona
                        </label>
                    </div>

                    <div>
                        <label>
                            <input checked={s.choiceType == 'not-exists'} onChange={e => this.setState({choiceType: 'not-exists'})} type="checkbox"/><i className="fa fa-times"></i> Brak daty
                        </label>
                    </div>
                </div>


                <div>
                    <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>Zastosuj</button>
                </div>
            </div>


        )
    }

}

class SelectFilter extends AbstractFilter implements IFilterComponent {
    FILTER_INTERFACE_TEST: boolean;
    select: any;

    public static defaultProps: Partial<IFilterProps> = {
        config: {multiselect: false, content: []}
    };

    handleApply(e) {
        e.stopPropagation();

        this.setState({show: false});

        console.log(this.select);
        let select = ReactDOM.findDOMNode(this.select);
        console.log(select);
        let values = [].filter.call(select.options, function (o) {
            return o.selected;
        }).map(function (o) {
            return o.value;
        });
        let labels = [].filter.call(select.options, function (o) {
            return o.selected;
        }).map(function (o) {
            return o.innerHTML;
        });


        if (this.props.onChange) {
            this.props.onChange({
                field: this.props.field,
                value: values,
                condition: 'IN',
                caption: this.props.caption,
                labelCaptionSeparator: ":",
                label: labels.join(', ')
            });
        }

    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleApply(e);
        }
    }

    render() {
        return (

            <div className={'w-filter w-filter-select'} >
                <select autoFocus ref={el => this.select = el} multiple={this.props.config.multiselect}
                        size={this.props.config.multiselect ? Object.keys(this.props.config.content).length : 1}
                        onKeyPress={this._handleKeyPress.bind(this)}
                >
                    {this.props.config.multiselect ? '' :
                        <option value="0">Wybierz opcję</option>
                    }
                    {Object.entries(this.props.config.content).map((el) =>
                        <option
                            key={el[0]}
                            value={el[0]}
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                e.currentTarget.selected = e.currentTarget.selected ? false : true;
                                return false;
                            }}
                        >{el[1]}</option>
                    )}
                </select>
                <div>
                    <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>Zastosuj</button>
                </div>
                {/*<pre>{JSON.stringify(this.props.content, null, 2)} {Object.keys(this.props.content).length}</pre>*/}
            </div>

        )
    }

}


class SwitchFilter extends AbstractFilter implements IFilterComponent {
    FILTER_INTERFACE_TEST: boolean;


    constructor(props) {
        super(props);
        this.state = {value: null};
    }

    handleApply() {
        this.setState({show: false});
        if (this.state.value) {
            this.props.onChange({
                field: this.props.field,
                value: this.state.value,
                condition: '==',
                caption: this.props.caption,
                labelCaptionSeparator: ":",
                label: this.props.config.content[this.state.value]
            });
        }
    }

    render() {
        return (


            <div className="w-filter w-filter-switch" ref="body">

                {Object.entries(this.props.config.content).map((el) =>
                    <div>
                        <label htmlFor={el[0]}>
                            <input
                                name="switch"
                                type="radio"
                                key={el[0]}
                                id={el[0]}
                                value={el[0]}
                                onChange={(e) => this.setState({value: el[0]})}
                                checked={(el[0] == this.state.value)}
                            /> {el[1]}</label>
                    </div>
                )}

                <div>
                    <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>Zastosuj</button>
                </div>
                {/*<pre>{JSON.stringify(this.props, null, 2)}</pre>*/}
            </div>

        )
    }

}

class NumericFilter extends AbstractFilter implements IFilterComponent {
    FILTER_INTERFACE_TEST: boolean;
    input2: HTMLInputElement;
    input1: HTMLInputElement;
    input3: HTMLTextAreaElement;

    constructor(props) {
        super(props)
        this.state = {option: '=='};
    }

    handleApply() {
        this.setState({show: false});

        let val, label;
        if (this.state.option != 'IN') {
            val = this.input1.value;
            if (this.state.option == '<x<') {
                val += '-' + this.input2.value
            }
            label = val;
        } else {
            val = this.input3.value.split('\n');
            label = val.join(', ')
            if (label.length > 50) {
                label = label.substring(0, 50) + '....';
            }

        }

        this.props.onChange({
            field: this.props.field,
            value: val,
            condition: this.state.option,
            caption: this.props.caption,
            labelCaptionSeparator: ":",
            label: label
        });

    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleApply();
        }
    }

    render() {
        const options = {
            '==': 'równa',
            '<': 'mniejsza',
            '<=': 'mniejsza równa',
            '>': 'większa',
            '>=': 'większa równia',
            '<x<': 'pomiędzy',
            'IN': 'wiele wartości ( rozdziel enterem )',
        };
        return (
            <div className={'w-filter w-filter-numeric'} ref="body">
                {this.state.option == '<x<' ?
                    <div className="w-filter-label">Od</div>
                    : ''}

                {this.state.option != 'IN' ?
                    <input type="text" autoFocus ref={el => this.input1 = el} onKeyPress={this._handleKeyPress.bind(this)}/>
                    :
                    <textarea autoFocus ref={el => this.input3 = el}/>
                }

                {this.state.option == '<x<' ?
                    <div className="w-filter-label">Do
                        <input type="text" ref={el => this.input2 = el} onKeyPress={this._handleKeyPress.bind(this)}/></div>
                    : ''}
                <select name="" id=""
                        onChange={(e) => this.setState({option: e.currentTarget.value})}
                        value={this.state.option}
                >
                    {Object.entries(options).map(([key, val]) =>
                        <option value={key} key={key}> {val}</option>
                    )}
                </select>
                <div>
                    <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>Zastosuj</button>
                </div>
                {/*<pre>{JSON.stringify(this.props, null, 2)}</pre>*/}
            </div>
        )
    }

}


class TextFilter extends AbstractFilter implements IFilterComponent {
    FILTER_INTERFACE_TEST: boolean;
    input: HTMLInputElement;
    options: any;

    constructor(props) {
        super(props)

        this.state = {
            option: 'LIKE'

        }

        this.options = {'LIKE': 'zawiera', '==': 'r\u00f3wny', '!=': 'r\u00f3\u017cne', 'NOT LIKE': 'nie zawiera', '^%': 'zaczyna si\u0119 od', '%$': 'ko\u0144czy si\u0119 na'};

    }

    handleApply() {
        this.setState({show: false});
        const value = this.input.value;
        if (value) {

            this.props.onChange({
                field: this.props.field,
                value: value,
                condition: this.state.option,
                caption: this.props.caption,
                labelCaptionSeparator: this.options[this.state.option] + ' :',
                label: this.input.value
            });

        }

    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleApply();
        }
    }

    render() {

        return (

            <div className={'w-filter w-filter-text '} ref="body">

                <input type="text" autoFocus onKeyPress={this._handleKeyPress.bind(this)} ref={(el) => this.input = el}/>

                <select
                    onChange={(e) => this.setState({option: e.currentTarget.value})}
                    value={this.state.option}

                >
                    {Object.entries(this.options).map(([key, val]) =>
                        <option value={key} key={key}> {val}</option>
                    )}
                </select>

                <div>
                    <button className="w-filter-apply" onClick={this.handleApply.bind(this)}>Zastosuj</button>
                </div>
            </div>

        )
    }

}




const withFilterOpenLayer = (filters: IFilterContext[]) => {
    return class FilterOpenableContainer extends React.Component<any, any> {
        container: HTMLDivElement;
        body: HTMLDivElement;
        hideTimeout: any;

        constructor(props) {
            super(props)
            this.state = {
                show: false,
            }

            this.hideTimeout = null;
        }

        componentDidUpdate(nextProps, nextState) {

            if (this.state.show == true) {
                let data = this.body.getBoundingClientRect();
                if (data.right > window.innerWidth) {
                    this.body.style.right = '0px';

                } else {

                }
            }

            return true
        }

        handleTriggerClicked(e) {
            e.stopPropagation();
            this.setState({show: !this.state.show});
        }

        onFocus(e) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        onBlur(e) {

            //todo wymienić daty ( tracące focus ) i zmienić timeout na dużo niższy
            var currentTarget = e.target;
            this.hideTimeout = setTimeout(() => {
                if (!currentTarget.contains(document.activeElement)) {
                    this.setState({show: false})
                }
            }, 300);
        }

        render() {

            let additionalHack = {
                tabIndex: 0
            }
            /* {Filter.map((Filter) => <Filter {...this.props} opened={this.state.show} container={this.container} />)} */
            return (
                <div
                    className={'w-filter-openable ' + (this.state.show ? 'w-filter-openable-opened ' : '')}
                    ref={el => this.container = el}

                    {...additionalHack}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onFocusCapture={this.onFocus.bind(this)}

                >
                    {this.props.inline ? '' :
                        <div className="w-filter-openable-trigger" onClick={this.handleTriggerClicked.bind(this)}><i className="ms-Icon ms-Icon--Filter"></i></div>
                    }
                    {this.state.show ?
                        <div className="w-filter-openable-body" ref={el => this.body = el}>

                            {filters.map(entry => {
                                let Filter = entry.component;
                                return <div>
                                    <Filter caption={entry.caption} field={entry.field} onChange={this.props.onChange} config={entry.config} container={this.container} />

                                </div>
                            })}
                        </div>
                        : ''}
                </div>
            )
        }
    }
}


export {
    DateFilter,
    SelectFilter,
    SwitchFilter,
    NumericFilter,
    TextFilter,
    AbstractFilter,
    withFilterOpenLayer,
    IFilterComponent
};
