import * as React from "react";
//import Inputmask from 'inputmask';
import Dropzone from 'react-dropzone';
import {ConnectionsField} from './fields/ConnectionsField'

import * as Selectivity from 'selectivity/react';
import 'react-dates/lib/css/_datepicker.css'
import 'selectivity/styles/selectivity-react.css'
import {IFieldChangeEvent, IFieldProps, IOption} from "./fields/Interfaces";


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


interface ISelectChangeEvent extends IFieldChangeEvent {
    selectedIndex: number,
}

export interface ISelectProps extends IFieldProps {
    options: IOption[] | { [key: string]: string },
    onChange?: { (changeData: ISelectChangeEvent): any },
    allowClear?: boolean
    value: string | number
    disabledClass: string
}

class Select extends React.Component<ISelectProps, any> {

    public static defaultProps: Partial<ISelectProps> = {
        options: [],
        editable: true,
        allowClear: false,
    };

    /*shouldComponentUpdate(nextProps, nextState) {

        return !deepIsEqual(
            [
                this.props.columns,
                this.props.onPage,
                this.props.currentPage
            ],
            [
                nextProps.columns,
                nextProps.onPage,
                nextProps.currentPage
            ]
        )
    }*/


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
        //console.log("select render");
        const props = this.props;
        if (!props.editable) {
            if (Array.isArray(props.options)) {
                for (let i in props.options) {
                    if (props.options[i].value == props.value) {
                        return <div
                            className={"w-field-presentgitation w-field-presentation-select " + props.disabledClass + (props.value ? "" : "w-field-presentation-empty")}
                        >{props.options[i].label}</div>;
                    }
                }
                return <div
                    className={"w-field-presentation w-field-presentation-select " + (props.value ? "" : "w-field-presentation-empty")}

                >{props.value}</div>;
            } else {
                return <div
                    className={"w-field-presentation w-field-presentation-select " + (props.value ? "" : "w-field-presentation-empty")}

                >{props.options[props.value]}</div>;
            }
        }


        let options = props.options
        if (!Array.isArray(props.options)) {
            options = Object.entries(props.options).map(([key, val]) => ({value: key, label: val}));
        }
        return (
            <div style={{position: "relative"}}>

                <Selectivity.React
                    allowClear={this.props.allowClear}

                    value={this.props.value || null}

                    items={(options as IOption[]).map((e) => ({id: e.value, text: e.label}))}

                    placeholder="Wybierz "

                    positionDropdown={(dropdown, select) => {
                        var dim = select.getBoundingClientRect()
                        dropdown.style.width = dim.width + "px";
                        dropdown.style.top = (dim.height) + "px";
                    }}


                    onChange={(e) => {
                        if (this.props.onChange) {
                            this.props.onChange({
                                name: this.props.name,
                                type: 'select',
                                value: e.value,
                                selectedIndex: null,
                                event: e
                            });
                        }
                    }}
                />

            </div>
        );
    }
}

export interface ITextProps extends IFieldProps {
    type?: 'text' | 'password',
    value?: string,
    onKeyDown?: any
}

class Text extends React.Component<ITextProps, any> {


    public static defaultProps: Partial<ITextProps> = {
        value: '',
        editable: true,
        type: 'text',
        autoFocus: false
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
                className={"w-field-presentation w-field-presentation-text " + props.disabledClass + " " + (props.value ? "" : "w-field-presentation-empty")}
            >{props.value}
            </div>;
        }

        return (
            <input
                className={props.className}
                name={props.name}
                type={props.type}
                value={props.value === null ? '' : props.value}
                onChange={this.handleOnChange.bind(this)}
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
                autoFocus={props.autoFocus}
                onKeyDown={props.onKeyDown}
            />

        );
    }
}


export interface ITextareaProps extends IFieldProps {
    value?: string,
}

class Textarea extends React.Component<ITextareaProps, any> {


    public static defaultProps: Partial<ITextareaProps> = {
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
                className={"w-field-presentation w-field-presentation-textarea " + props.disabledClass}>{props.value}</div>;
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


export interface IWysiwygProps extends IFieldProps {
    onLoad?: { (): any },
    value?: string,

}

//let CKEDITOR = undefined;

class Wysiwyg extends React.Component<IWysiwygProps, any> {


    public static defaultProps: Partial<IWysiwygProps> = {
        value: '',
        editable: true,
        style: {}

    };
    private id: string;

    constructor(props) {
        super(props);
        this.id = 'fields-wysiwyg-' + (Math.random() * 10000000).toFixed(0);
        this.state = {
            libsLoaded: false
        };

    }

    handleOnChange(value, event) {
        this.setState({value: value});
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'wysiwyg',
                value: value,
                event: event
            });
        }
    }

    handleOnLoad() {
        CKEDITOR.instances[this.id].setData(this.props.value);

        //just textarea replacement making value of editor and value of form not equal
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    initializeEditor() {
        Promise.all([
            import( 'scriptjs')
        ]).then(imported => {
            //https://cdnjs.cloudflare.com/ajax/libs/ckeditor/4.7.3/plugins/justify/icons/hidpi/justifyblock.png

            imported[0]('https://cdn.ckeditor.com/4.7.3/full/ckeditor.js', () => {
                this.setState({libsLoaded: true});
                let config: any = {
                    toolbar: [

                        {name: 'clipboard', items: ['Undo', 'Redo']},
                        {name: 'styles', items: ['Format']},
                        {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat']},
                        //{name: 'colors', items: ['TextColor', 'BGColor']},
                        {name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
                        {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote']},
                        '/',
                        {name: 'styles', items: ['HorizontalRule']},
                        {name: 'links', items: ['Link', 'Unlink']},
                        {name: 'insert', items: ['Image', 'Table']},
                        {name: 'tools', items: ['Maximize', "Source"]},

                    ],
                    extraPlugins: "justify",
                    enterMode: CKEDITOR.ENTER_P
                };
                if (this.props.style.height) {
                    config.height = this.props.style.height;
                }

                config.allowedContent = true;
                config.extraAllowedContent = 'iframe[*]';

                CKEDITOR.replace(this.id, config);
                config.width = 500;

                CKEDITOR.instances[this.id].on('change', (e) => {
                    let data = CKEDITOR.instances[this.id].getData();
                    if (data != this.props.value && this.isInputTextChanged(this.props.value)) {
                        this.handleOnChange(data, e);
                    }
                });


                CKEDITOR.instances[this.id].on('instanceReady', () => this.handleOnLoad());

            });
        });
    }

    isInputTextChanged(input) {
        let data = CKEDITOR.instances[this.id].getData();

        if (input == null) {
            return data != "";
        }
        if (data != input.replace(/\r\n/g, "\n")) {
            return true
        }

        return false;

    }

    componentDidMount() {
        if (this.props.editable) {
            this.initializeEditor()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.editable == false && this.props.editable == true) {
            this.initializeEditor();
        }
        if (prevProps.editable == true && this.props.editable == false) {
            CKEDITOR.instances[this.id].destroy();
        }
    }

    componentWillReceiveProps(nextProps, currentProps) {
        if (
            typeof (CKEDITOR) != "undefined" && CKEDITOR.instances[this.id] != undefined &&
            nextProps.value && nextProps.value != CKEDITOR.instances[this.id].getData()
            && this.isInputTextChanged(nextProps.value)
        ) {
            CKEDITOR.instances[this.id].setData(nextProps.value);


        }
    }


    componentWillUnmount() {
        if (typeof (CKEDITOR) != "undefined") {
            if (CKEDITOR.instances[this.id] != undefined) {
                CKEDITOR.instances[this.id].destroy();
            }
        }
    }

    render() {
        let props = this.props;
        if (!props.editable) {
            return <div
                className="w-field-presentation w-field-presentation-wysiwyg"
                dangerouslySetInnerHTML={{__html: props.value}}></div>;
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
                placeholder={props.placeholder}
                disabled={props.disabled}
                style={props.style}
                onChange={() => true}
            />

        );
    }
}


export interface ISwitchProps extends IFieldProps {
    options: { value: string | number, label: string }[] | { [key: string]: string },
    value?: number | string,
}

class Switch extends React.Component<ISwitchProps, any> {


    public static defaultProps: Partial<ISwitchProps> = {
        editable: true
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    handleOnChange(value, event) {
        this.setState({value: value});

        //this.refs.hidden.value = date;
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'switch',
                value: value,
                event: event
            });
        }
    }

    render() {
        const props = this.props;

        if (!props.editable) {
            if (Array.isArray(props.options)) {
                for (let i in props.options) {
                    if (props.options[i].value == props.value) {
                        return <div
                            className={"w-field-presentation w-field-presentation-switch " + props.disabledClass}
                        >{props.options[i].label}</div>;
                    }
                }
                return <div
                    className={"w-field-presentation w-field-presentation-switch " + (props.value ? "" : "w-field-presentation-empty")}
                >{props.value}</div>;
            } else {
                return <div
                    className={"w-field-presentation w-field-presentation-switch " + (props.options[props.value] ? "" : "w-field-presentation-empty")}
                >{props.options[props.value]}</div>;
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

export interface ICheckboxGroupProps extends IFieldProps {
    options: { value: string | number, label: string }[] | { [key: string]: string },
    value: string[]
    inline: boolean
}

class CheckboxGroup extends React.Component<ICheckboxGroupProps, any> {


    public static defaultProps: Partial<ICheckboxGroupProps> = {
        value: [],
        editable: true
    };


    constructor(props) {
        super(props);
        this.state = {};
    }

    handleOnChange(e) {
        let value: string[] = this.props.value.slice(0);
        if (e.target.checked) {
            value.push(e.target.value);
        } else {
            value = value.filter((el) => el != e.target.value);
        }

        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                type: 'checkboxgroup',
                value: value,
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
                    {/*{props.value.map(val => <li key={val}>{props.options[val]}</li>)}*/}
                    TODO
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


let locale;
let datePicker;
let moment;

export interface IDateProps extends IFieldProps {
    value: string,
    placeholder?: string;
}

class Date extends React.Component<IDateProps, any> {


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
            import('moment'),
            import( 'moment/locale/pl' ),
            import( 'react-dates' ),
        ]).then(imported => {
            [moment, locale, datePicker/*, timePicker*/] = imported;

            this.setState({
                date: this.props.value && this.props.value != "0000-00-00" ? moment(this.props.value, 'YYYY-MM-DD') : null,
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
                value: date.format('YYYY-MM-DD'),
                event: null
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
                    onDateChange={date => this.handleOnChange(date)}
                    focused={this.state.focused}
                    onFocusChange={({focused}) => this.setState({focused})}
                    isOutsideRange={() => false}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                />
            </div>
        )
            ;
    }
}

export interface IFileProps extends IFieldProps {
    value: FileList
}


class File extends React.Component<IFileProps, any> {

    constructor(props) {
        super(props);
    }

    handleFileAdd(e) {
        if (this.props.onChange) {

            this.props.onChange({
                name: this.props.name,
                type: 'file',
                value: e,
                event: e
            });
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
                {props.value && Array.isArray(props.value) && <div className="w-file-dropzone-up-list">{props.value.map(el => <div>
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


export {Text, Select, Switch, CheckboxGroup, Textarea, Date, File, Wysiwyg, ConnectionsField};

