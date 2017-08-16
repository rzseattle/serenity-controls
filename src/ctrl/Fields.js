import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Inputmask from 'inputmask';
import moment from 'moment';
import Dropzone from 'react-dropzone'

import( 'moment/locale/pl' );
moment.locale('pl');
import {DateRangePicker, SingleDatePicker, DayPickerRangeController} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

let checkIncludes = (options, value) => {
    let element = options.filter((element) => {
        if (element.value !== undefined) {
            return element.value == value;
        } else {
            return element == value;
        }
    });
    return element.length > 0;
}


class Select extends Component {


    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
    };
    static defaultProps = {
        options: [],
        editable: true
    }

    render() {
        const props = this.props;
        if (!props.editable) {
            if (Array.isArray(props.options)) {
                for (let i in props.options) {
                    if (props.options[i].value == props.value) {
                        return <div>{props.options[i].label}</div>;
                    }
                }
                return <div className="w-field-presentation w-field-presentation-select">{props.value}</div>
            } else {
                return <div className="w-field-presentation w-field-presentation-select">{props.options[props.value]}</div>;
            }
        }

        return (
            <select
                className={props.className}
                name={props.name}
                onChange={props.onChange}
                value={props.value === null ? '' : props.value}
                disabled={props.disabled}
                style={props.style}
            >
                {Array.isArray(props.options) ?
                    props.options.map(option => {
                        return <option key={option.value} value={option.value}> {option.label}</option>
                    })
                    :
                    Object.entries(props.options).map(([value, label]) => {
                        return <option key={value} value={value}> {label}</option>
                    })
                }
            </select>
        )
    }
}


class Text extends Component {
    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,

    };
    static defaultProps = {
        value: '',
        editable: true
    }

    componentDidMount() {
        //const $input_elem = ReactDOM.findDOMNode(this.refs.field);
        //Inputmask('9-a{1,3}9{1,3}').mask($input_elem);
    }

    render() {
        const props = this.props;
        if (!props.editable) {
            return <div className="w-field-presentation w-field-presentation-text">{props.value}</div>;
        }

        return (
            <input
                ref="field"
                className={props.className}
                name={props.name}
                type={props.type}
                value={props.value === null ? '' : props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
            />

        )
    }
}


class Textarea extends React.Component {


    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
    };
    static defaultProps = {
        value: '',
        editable: true
    }

    render() {
        let props = this.props;
        if (!props.editable) {
            return <div className="w-field-presentation w-field-presentation-textarea">{props.value}</div>
        }
        return (
            <textarea
                className={props.className}
                name={props.name}
                type={props.type}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value === null ? '' : props.value}
                disabled={props.disabled}
                style={props.style}
            />

        )
    }
}


class Switch extends React.Component {

    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
    }

    static defaultProps = {
        editable: true
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    handleOnChange(value) {
        this.setState({value: value});

        //this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({name: this.props.name, type: 'switch', value: value});
        }
    }

    render() {
        const props = this.props;

        if (!props.editable) {
            if (Array.isArray(props.options)) {
                for (let i in props.options) {
                    if (props.options[i].value == props.value) {
                        return <div>{props.options[i].label}</div>;
                    }
                }
                return <div>{props.value}</div>
            } else {
                return <div>{props.options[props.value]}</div>;
            }
        }


        let gen = (value, label) => {
            return <div key={value}>
                <div
                    className={'w-switch-label ' + (props.value == value ? 'w-switch-active' : '')}
                    onClick={this.handleOnChange.bind(this, value)}
                >
                    {label}
                </div>
            </div>


        };
        return (
            <div className="w-switch">
                {Array.isArray(props.options) ?
                    props.options.map(el => gen(el.value, el.label))
                    :
                    Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        )
    }
}


class CheckboxGroup extends React.Component {

    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        name: PropTypes.string,
        value: PropTypes.array,
        onChange: PropTypes.func,
        inline: PropTypes.bool,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,

    }

    static defaultProps = {
        value: [],
        editable: true
    }


    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let props = this.props;
        if (!props.editable) {
            if (Array.isArray(props.options)) {

                let elements = [];

                for (let i in props.value) {
                    var element = props.options.filter(function (v, index) {
                        return v.value == props.value[i];
                    });
                    elements.push(<li key={element[0].value}>{element[0].label}</li>)
                }

                if (elements.length > 0) {
                    return <ul className="w-field-presentation w-field-presentation-checkboxgroup">{elements}</ul>
                }

                return <div className="w-field-presentation w-field-presentation-checkboxgroup">{props.value.join(',')}</div>
            } else {
                return <ul className="w-field-presentation w-field-presentation-checkboxgroup">
                    {props.value&&props.value.map(val => <li key={val}>{props.options[val]}</li>)}
                </ul>;
            }
        }


        let gen = (value, label) => {
            let field = <input type="checkbox"
                               name={props.name}
                               value={value}
                               checked={props.value && checkIncludes(props.value, value)}
                               onChange={props.onChange}
                               disabled={props.disabled}
            />;
            if (props.inline == true) {
                return <label className="checkbox-inline" key={value}> {field}{label}</label>
            } else {
                return <div className="checkbox" key={value}><label> {field}{label} </label></div>
            }
        };
        return (
            <div>
                {Array.isArray(props.options) ?
                    props.options.map(el => gen(el.value, el.label))
                    :
                    Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        )
    }
}


class Date extends React.Component {

    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool

    };

    static defaultProps = {
        editable: true
    }


    constructor(props) {
        super(props);
        this.state = {
            value: null,
            date: props.value ? moment(props.value, 'YYYY-MM-DD') : null
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

        if (!props.editable) {
            return <div className="w-field-presentation w-field-presentation-date">{props.value}</div>
        }
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


class File extends React.Component {

    constructor(props) {
        super(props);
    }

    handleFileAdd(e) {
        if (this.props.onChange) {
            console.log(e);
            this.props.onChange({name: this.props.name, value: e});
        }
    }

    render() {
        let props = this.props;
        return (
            <div className="w-file-upload">
                <Dropzone
                    style={{}}
                    className="w-file-dropzone"
                    activeClassName="w-gallery-add-active" onDrop={this.handleFileAdd.bind(this)}>
                    <span>
                        <i className="fa fa-plus-circle"></i>
                        Kliknij lub przeciągnij tu plik
                    </span>

                </Dropzone>
                {props.value && <div className="w-file-dropzone-up-list">{props.value.map(el => <div>
                    <div>
                        <a href={el.preview || el.path} target="_blank">
                            <div className="w-file-dropzone-up-list-icon">
                                {el.type.indexOf('image') != -1 && <img src={el.preview || el.path} alt=""/>}
                                {el.type.indexOf('image') == -1 && <i className="fa fa-file"/>}
                            </div>
                            <div className="w-file-dropzone-up-list-name">{el.name}</div>
                            <div className="w-file-dropzone-up-list-status"><i className={'fa fa-' + (el.preview ? 'upload' : 'check')}></i></div>
                        </a>
                    </div>
                </div>)}</div>}

            </div>
        )
    }
}


/*<input

                    name={props.name}
                    type="file"
                    onChange={props.onChange}
                    disabled={props.disabled}

                />*/


File.propTypes = {

    name: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};


export {Text, Select, Switch, CheckboxGroup, Textarea, Date, File};

