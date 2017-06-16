import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const Select = (props) => {
    return (
        <select className={props.className} name={props.name} onChange={props.onChange} defaultValue={props.value}>
            {Object.entries(props.options).map(([value, label]) => {
                return <option key={value} value={value}  >{value}  {label}</option>
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
};


const Text = (props) => {
    return (
        <input
            className={props.className}
            name={props.name}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />

    )
}

Text.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,

};
Text.defaultProps = {
    value: ''
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
    inline: PropTypes.bool
}

const CheckboxGroup = (props) => {

    let gen = (value, label) => {
        let field = <input type="checkbox"
            name={props.name}
            value={value}
            checked={props.value.includes(value)}
            onChange={props.onChange}
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
    inline: PropTypes.bool
}

CheckboxGroup.defaultProps = {
    value: []
}


class Date extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
            
        };
    }
    handleOnChange(date) {
        this.setState({ date, value: date });
        console.log(this.state);
        
        //this.refs.hidden.value = date;
        //this.props.onChange(date);
    }
    render() {
        const props = this.props;
        return (
            <span>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={date => this.handleOnChange(date)} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                />
                <input
                    name={props.name}
                    type="text"
                    value={this.state.value}
                    onChange={props.onChange}
                    ref="hidden"
                />
            </span>
        )
    }
}

Date.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,

};


export { Text, Select, Switch, CheckboxGroup, Textarea, Date };

