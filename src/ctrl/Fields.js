import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Inputmask from 'inputmask';
import moment from 'moment';

import( 'moment/locale/pl' );
moment.locale('pl');
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const Select = (props) => {
    return (
        <select
            className={props.className}
            name={props.name}
            onChange={props.onChange}
            defaultValue={props.value}
            disabled={props.disabled}
        >
            {Object.entries(props.options).map(([value, label]) => {
                return <option key={value} value={value}> {label}</option>
            })}
        </select>
    )
}

Select.propTypes = {
    options: PropTypes.object.isRequired,
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

Select.defaultProps = {
    options: {}
}


class Text extends Component {
    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool

    };
    static defaultProps = {
        value: ''
    }

    componentDidMount() {
        //const $input_elem = ReactDOM.findDOMNode(this.refs.field);
        //Inputmask('9-a{1,3}9{1,3}').mask($input_elem);
    }

    render() {
        const props = this.props;
        return (
            <input
                ref="field"
                className={props.className}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />

        )
    }
}


const Textarea = (props) => {
    return (
        <textarea
            className={props.className}
            name={props.name}
            type={props.type}
            onChange={props.onChange}
            placeholder={props.placeholder}
            value={props.value}
            disabled={props.disabled}
        />

    )
}


Textarea.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool
};
Textarea.defaultProps = {
    value: ''
}


const Switch = (props) => {

    let gen = (value, label) => {
        let field = <input type="radio"
                           name={props.name}
                           value={value}
                           checked={props.value == value}
                           onChange={props.onChange}
        />;
        if (props.inline == true) {
            return <label className="radio-inline" key={value}>{field}{label}</label>
        } else {
            return <div className="radio" key={value}><label>{field}{label}</label></div>
        }
    };
    return (
        <div>
            {Object.entries(props.options).map(([value, label]) => gen(value, label))}
        </div>
    )
}

Switch.propTypes = {
    options: PropTypes.object.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    disabled: PropTypes.bool

}

const CheckboxGroup = (props) => {

    let gen = (value, label) => {
        let field = <input type="checkbox"
                           name={props.name}
                           value={value}
                           checked={props.value && props.value.includes(value)}
                           onChange={props.onChange}
                           disabled={props.disabled}
        />;
        if (props.inline == true) {
            return <label className="checkbox-inline" key={value}> {field}{label}</label>
        } else {
            return <div className="checkbox" key={value}><label> {field}{label}</label></div>
        }
    };
    return (
        <div>
            {Object.entries(props.options).map(([value, label]) => gen(value, label))}
        </div>
    )
}

CheckboxGroup.propTypes = {
    options: PropTypes.object.isRequired,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    inline: PropTypes.bool,
    disabled: PropTypes.bool
}

CheckboxGroup.defaultProps = {
    value: []
}


class Date extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            date: props.value //? moment(props.value, 'YYYY-MM-DD') : moment()


        };
    }

    handleOnChange(date) {
        this.setState({date, value: date});


        //this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({name: this.props.name, type: 'date', value: date.format('YYYY-MM-DD')});
        }
    }

    render() {
        const props = this.props;
        return (
            <div>
                <SingleDatePicker
                    numberOfMonths={1}
                    displayFormat="YYYY-MM-DD"
                    date={this.state.date}
                    onDateChange={date => this.handleOnChange(date)} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({focused}) => this.setState({focused})} // PropTypes.func.isRequired
                    isOutsideRange={() => false}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                />
            </div>
        )
    }
}

Date.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool

};


const File = (props) => {
    return (
        <input

            name={props.name}
            type="file"
            onChange={props.onChange}
            disabled={props.disabled}

        />

    )
}

File.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};


export {Text, Select, Switch, CheckboxGroup, Textarea, Date, File};

