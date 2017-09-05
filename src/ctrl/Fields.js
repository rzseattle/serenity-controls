import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Inputmask from 'inputmask';
import Dropzone from 'react-dropzone';


let checkIncludes = (options, value) => {
    let element = options.filter((element) => {
        if (element.value !== undefined) {
            return element.value == value;
        } else {
            return element == value;
        }
    });
    return element.length > 0;
};


class Select extends Component {


    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        editable: PropTypes.bool
    };
    static defaultProps = {
        options: [],
        editable: true
    };

    handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'select',
                value: e.target.value,
                selectedIndex: e.target.selectedIndex,
                event: e
            });
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
                return <div
                    className="w-field-presentation w-field-presentation-select">{props.value}</div>;
            } else {
                return <div
                    className="w-field-presentation w-field-presentation-select">{props.options[props.value]}</div>;
            }
        }

        return (
            <select
                className={props.className}
                name={props.name}
                onChange={this.handleOnChange.bind(this)}
                value={props.value === null ? '' : props.value}
                disabled={props.disabled}
                style={props.style}
            >
                {Array.isArray(props.options) ?
                    props.options.map(option => {
                        return <option key={option.value} value={option.value}> {option.label}</option>;
                    })
                    :
                    Object.entries(props.options).map(([value, label]) => {
                        return <option key={value} value={value}> {label}</option>;
                    })
                }
            </select>
        );
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
        editable: PropTypes.bool

    };
    static defaultProps = {
        value: '',
        editable: true
    };

    handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'text', value: e.target.value,
                event: e
            });
        }
    }

    componentDidMount() {
        //const $input_elem = ReactDOM.findDOMNode(this.refs.field);
        //Inputmask('9-a{1,3}9{1,3}').mask($input_elem);
    }

    render() {
        const props = this.props;
        if (!props.editable) {
            return <div
                className="w-field-presentation w-field-presentation-text">{props.value}</div>;
        }

        return (
            <input
                ref="field"
                className={props.className}
                name={props.name}
                type={props.type}
                value={props.value === null ? '' : props.value}
                onChange={this.handleOnChange.bind(this)}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
            />

        );
    }
}


class Textarea extends React.Component {


    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        editable: PropTypes.bool
    };
    static defaultProps = {
        value: '',
        editable: true
    };

    handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'textarea', value: e.target.value,
                event: e
            });
        }
    }

    render() {
        let props = this.props;
        if (!props.editable) {
            return <div
                className="w-field-presentation w-field-presentation-textarea">{props.value}</div>;
        }
        return (
            <textarea
                className={props.className}
                name={props.name}
                onChange={this.handleOnChange.bind(this)}
                placeholder={props.placeholder}
                value={props.value === null ? '' : props.value}
                disabled={props.disabled}
                style={props.style}
            />

        );
    }
}

class Wysiwyg extends React.Component {


    static propTypes = {
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        onLoad: PropTypes.func,
        disabled: PropTypes.bool,
        editable: PropTypes.bool,
        style: PropTypes.object
    };
    static defaultProps = {
        value: '',
        editable: true,
        style: {}

    };

    constructor(props) {
        super(props);
        this.id = 'fields-wysiwyg-' + (Math.random() * 10000000).toFixed(0);
        this.state = {libsLoaded: false};

    }

    handleOnChange(value) {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange({name: this.props.name, type: 'wysiwyg', value: value});
        }
    }

    handleOnLoad() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    componentDidMount() {
        Promise.all([
            import( 'scriptjs')
        ]).then(imported => {
            imported[0]('https://cdn.ckeditor.com/4.7.2/standard/ckeditor.js', () => {
                this.setState({libsLoaded: true});
                let config = {};
                if (this.props.style.height) {
                    config.height = this.props.style.height;
                }
                CKEDITOR.replace(this.id, config);
                config.width = 500;
                CKEDITOR.instances[this.id].on('change', () => {
                    let data = CKEDITOR.instances[this.id].getData();
                    if (data != this.props.data) {
                        this.handleOnChange(data);
                    }
                });


                CKEDITOR.on('instanceReady', () => this.handleOnLoad());


            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.values) {
            CKEDITOR.instances[this.id].setData(nextProps.values);
        }
    }


    componentWillUnmount() {
        CKEDITOR.instances[this.id].destroy();
    }

    render() {
        let props = this.props;
        if (!props.editable) {
            return <div
                className="w-field-presentation w-field-presentation-wysiwyg">{props.value}</div>;
        }

        if (this.state.libsLoaded == false) {
            return <div className={'w-filter w-filter-date'}>
                <div><i className="fa fa-cog fa-spin"></i></div>
            </div>;
        }

        return (
            <textarea
                id={this.id}
                className={props.className}
                name={props.name}
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value === null ? '' : props.value}
                disabled={props.disabled}
                style={props.style}
            />

        );
    }
}


class Switch extends React.Component {

    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
        name: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        editable: PropTypes.bool
    };

    static defaultProps = {
        editable: true
    };

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
                return <div>{props.value}</div>;
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
            </div>;


        };
        return (
            <div className="w-switch">
                {Array.isArray(props.options) ?
                    props.options.map(el => gen(el.value, el.label))
                    :
                    Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        );
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
        editable: PropTypes.bool

    };

    static defaultProps = {
        value: [],
        editable: true
    };


    constructor(props) {
        super(props);
        this.state = {};
    }

     handleOnChange(e) {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'checkboxgroup', value: e.target.value,
                event: e
            });
        }
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
                    elements.push(<li key={element[0].value}>{element[0].label}</li>);
                }

                if (elements.length > 0) {
                    return <ul
                        className="w-field-presentation w-field-presentation-checkboxgroup">{elements}</ul>;
                }

                return <div
                    className="w-field-presentation w-field-presentation-checkboxgroup">{props.value.join(',')}</div>;
            } else {
                return <ul className="w-field-presentation w-field-presentation-checkboxgroup">
                    {props.value && props.value.map(val => <li key={val}>{props.options[val]}</li>)}
                </ul>;
            }
        }


        let gen = (value, label) => {
            let field = <input type="checkbox"
                               name={props.name}
                               value={value}
                               checked={props.value && checkIncludes(props.value, value)}
                               onChange={this.handleOnChange.bind(this)}
                               disabled={props.disabled}
            />;
            if (props.inline == true) {
                return <label className="checkbox-inline" key={value}> {field}{label}</label>;
            } else {
                return <div className="checkbox" key={value}><label> {field}{label} </label></div>;
            }
        };
        return (
            <div>
                {Array.isArray(props.options) ?
                    props.options.map(el => gen(el.value, el.label))
                    :
                    Object.entries(props.options).map(([value, label]) => gen(value, label))}
            </div>
        );
    }
}

let moment;
let locale;
let datePicker;

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
    };


    constructor(props) {
        super(props);
        this.state = {
            value: null,
            date: null,
            libsLoaded: false
        };
    }

    componentWillMount() {

        Promise.all([
            import( 'moment'),
            import( 'moment/locale/pl' ),
            import( 'react-dates' ),
            import( 'react-dates/lib/css/_datepicker.css' )
        ]).then(imported => {
            [moment, locale, datePicker] = imported;
            this.setState({
                date: this.props.value ? moment(this.props.value, 'YYYY-MM-DD') : null,
                libsLoaded: true
            });
        });


    }

    handleOnChange(date) {
        this.setState({date, value: date});


        //this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'date',
                value: date.format('YYYY-MM-DD')
            });
        }
    }

    render() {
        const props = this.props;

        if (!props.editable) {
            return <div
                className="w-field-presentation w-field-presentation-date">{props.value}</div>;
        }
        if (this.state.libsLoaded == false) {
            return <div className={'w-filter w-filter-date'}>
                <div><i className="fa fa-cog fa-spin"></i></div>
            </div>;
        }

        return (
            <div>
                <datePicker.SingleDatePicker
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
        );
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
                                {el.type.indexOf('image') != -1 &&
                                <img src={el.preview || el.path} alt=""/>}
                                {el.type.indexOf('image') == -1 && <i className="fa fa-file"/>}
                            </div>
                            <div className="w-file-dropzone-up-list-name">{el.name}</div>
                            <div className="w-file-dropzone-up-list-status"><i
                                className={'fa fa-' + (el.preview ? 'upload' : 'check')}></i></div>
                        </a>
                    </div>
                </div>)}</div>}

            </div>
        );
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


export {Text, Select, Switch, CheckboxGroup, Textarea, Date, File, Wysiwyg};

