import React, {Children} from 'react'
import {Text, Select, Switch, CheckboxGroup, Textarea, Date} from '../ctrl/Fields'
import PropTypes from 'prop-types';

const withBootstrapFormField = (Field) => {


    return class BootstrapFieldContainer extends React.Component {

        static propTypes = {
            label: PropTypes.string,
            help: PropTypes.string,
            form: PropTypes.object
        }

        render() {
            let props = this.props;

            let classes = ['form-group'];

            if (this.props.errors) {
                classes.push('has-error')
            }

            if (props.layoutType == 'horizontal') {

                return (
                    <div className={classes.join(' ')}>
                        <label className="col-sm-2 control-label">{props.label}</label>
                        <div className="col-sm-10">
                            <Field {...props} className="form-control"/>
                            {props.errors ?
                                <span className="help-block">{props.errors.join(', ')} </span>

                                : ''}
                        </div>
                    </div>
                )
            }
            if (props.layoutType == 'default' || props.layoutType == 'inline' || !props.layoutType) {
                return (
                    <div className={classes.join(' ')}>
                        <label>{this.props.label}</label>
                        <Field {...this.props} className="form-control"/>

                        {props.help ?
                            <span class="help-block">{props.help} </span>
                            : ''}
                        {props.errors ?
                            <span className="help-block">{props.errors.join(', ')} </span>

                            : ''}
                        {/*.join(", ")*/}
                    </div>
                )
            }
        }
    }
}

class BForm extends React.Component {


    static propTypes = {
        /**
         * ( default | inline | horizontal )
         */
        layoutType: PropTypes.oneOf(['default', 'inline', 'horizontal']),
        /**
         * This callback is fired when form input is changed
         * @callback
         * @param {object} keys: inputEvent, form
         */
        onChange: PropTypes.func,
        /**
         * This callback is fired when form input is submited preventin "action send"
         * @callback
         * @param {object} keys: inputEvent, form
         */
        onSubmit: PropTypes.func,
        /**
         * This callback is fired to prepare data to sends
         * @callback
         * @param {object} keys: inputEvent, form
         */
        onBeforeSend: PropTypes.func,
        /**
         * This callback is fired when validation error occured
         * @callback
         * @param {object} keys: response, form
         */
        onValidatorError: PropTypes.func,
        /**
         * This callback is fired when server error occured
         * @callback
         * @param {object} keys: response, form
         */
        onError: PropTypes.func,
        /**
         * This callback is fired after from submited with success
         * @callback
         * @param {object} keys: response, form
         */
        onSuccess: PropTypes.func,
        /**
         * Input data for form inputs ( key = input name )
         */
        data: PropTypes.object,
        /**
         * Form target action
         */
        action: PropTypes.string,
    }

    static defaultProps = {
        layoutType: 'default',
        data: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            fieldErrors: {},
            formErrors: {},
            isDirty: false,
            loading: false,
        };
    }

    /**
     * Return form input data
     */
    getData() {
        return this.state.data;
    }

    /**
     * Handle validation error
     * @param {object} response
     */
    handleValidatorError(response) {
        if (this.props.onValidatorError) {
            this.props.onValidatorError({form: this, response: response});
        }

        this.setState({
            fieldErrors: response.fieldErrors,
            formErrors: response.errors,
        })

        this.forceUpdate();
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.props.onSubmit) {
            this.props.onSubmit({inputEvent: e, form: this});
        } else {
            if (this.props.action) {

                if (this.props.onBeforeSend) {
                    this.props.onBeforeSend(e);
                }
                $.post(this.props.action, {data: this.getData()}, (response) => {
                    try {
                        let data = JSON.parse(response)
                        if (data.errors === undefined) {

                            if (this.props.onSuccess) {
                                this.props.onSuccess({form: this, response: response});

                                this.setState({
                                    fieldErrors: {},
                                    formErrors: [],
                                })
                            }
                        } else {
                            alertify.error('Popraw formularz');
                            this.handleValidatorError(data)
                        }
                    } catch (e) {
                        this.debugError(e.message + '<hr />' + response);
                        if (this.props.error) {
                            this.props.onError({form: this, response: response});
                        }
                    }
                });
            }
        }
        return false;
    }

    debugError(error) {
        let errorWindow = window.open('', '', 'width=800,height=600');
        errorWindow.document.write(error);
        errorWindow.focus();
    }

    handleInputChange(e) {
        let name, type, value;
        //custom event data
        if (e.name !== undefined) {
            name = e.name
            value = e.value
            type = e.type
        } else {
            name = e.target.getAttribute('name');
            type = e.target.getAttribute('type');
            value = e.target.value;
        }

        console.log(name + " " + value);


        if (type == 'checkbox') {
            let checked = e.target.checked;

            if (!Array.isArray(this.state.data[name])) {
                if (!checked) {
                    this.state.data[name] = [];
                } else {
                    this.state.data[name] = [value];
                }
            } else {
                if (checked) {
                    this.state.data[name].push(value);
                } else {
                    let index = this.state.data[name].indexOf(value);
                    this.state.data[name].splice(index, 1);
                }
            }

        } else {
            this.state.data[name] = value;
        }
        this.setState({data: this.state.data, isDirty: true});

        if (this.props.onChange) {
            this.props.onChange({form: this, inputEvent: e});
        }

    }

    renderChildren(children) {
        return React.Children.map(children, child => {

            if (child.type && child.type.name == 'BootstrapFieldContainer') {

                if (this.state.data[child.props.name] === undefined) {
                    this.state.data[child.props.name] = null;
                }
                if (this.state.fieldErrors[child.props.name] === undefined) {
                    this.state.fieldErrors[child.props.name] = null;
                }
                this.props.data[child.props.name] = this.props.data[child.props.name] || undefined;

                return React.cloneElement(child, {
                    value: this.props.data[child.props.name],
                    layoutType: this.props.layoutType,
                    errors: this.state.fieldErrors[child.props.name],
                    onChange: (e) => {

                        this.handleInputChange(e);
                    }
                })
            } else {
                return child
            }
        })
    }

    applyToField(name) {

        if (this.state.data[name] === undefined) {
            this.state.data[name] = null;
        }
        if (this.state.fieldErrors[name] === undefined) {
            this.state.fieldErrors[name] = null;
        }
        return {
            value: this.props.data[name],
            layoutType: this.props.layoutType,
            errors: this.state.fieldErrors[name],
            onChange: (e) => {
                this.handleInputChange(e);
            }
        }
    }

    render() {
        const layoutType = this.props.layoutType;

        let classes = [];
        if (layoutType == 'horizontal') {
            classes.push('form-horizontal');
        } else if (layoutType == 'inline') {
            classes.push('form-inline');
        }

        return (
            <form className={classes.join(' ')} onSubmit={this.handleSubmit.bind(this)}>
                {this.state.formErrors.length > 0 ?
                    <ul className="bg-danger ">
                        {this.state.formErrors.map(el => <li>{el}</li>)}
                    </ul>
                    :
                    ''
                }

                {typeof this.props.children == 'function' ?
                    this.props.children(this.applyToField.bind(this))
                    :
                    this.renderChildren(this.props.children)
                }

            </form>
        )
    }
}


const BButtonsBar = props => {
    return (<div className="row form-group">
        <div className="col-sm-10 col-sm-offset-2">
            {props.children}
        </div>
    </div>)
}
BButtonsBar.propTypes = {
    children: PropTypes.any.isRequired
}

const BText = withBootstrapFormField(Text);
const BTextarea = withBootstrapFormField(Textarea);
const BSelect = withBootstrapFormField(Select);
const BSwitch = withBootstrapFormField(Switch);
const BCheckboxGroup = withBootstrapFormField(CheckboxGroup);
const BDate = withBootstrapFormField(Date);
export {BForm, BText, BSwitch, BSelect, BCheckboxGroup, BTextarea, BButtonsBar, BDate};