import React, {Component} from 'react';
import PropTypes from 'prop-types';

var NotificationSystem = require('react-notification-system');


export default class PanelComponentLoader extends Component {

    //propTypes = {}

    _notificationSystem: null;

    constructor(props) {
        super(props);
        this.state = {
            propsLoading: false,
            loadedProps: false,
            currComponent: ReactHelper.get(props.component)
        }
    }

    handleReloadProps(input = {}, callback = false) {
        this.setState({propsLoading: true});
        $.get(this.props.requestURI, {...input, __PROPS_REQUEST__: 1}, (data) => {
            this.setState({propsLoading: false, loadedProps: data});
            if (callback) {
                callback();
            }
        });
    }

    handleResolveComponent(path) {
        alert('Resolving component ' + path);

    }

    handleGoTo(path, input = {}) {
        this.setState({propsLoading: true});
        $.get(path, {...input, __PROPS_REQUEST__: 1}, (data) => {
            this.setState({propsLoading: false, loadedProps: data, currComponent: ReactHelper.get(data.component)});
        });
    }

    handleNotifycation(message, title = '', options = {}) { 
        let data =  { title: title, message: message,  ...{ level:'success', ...options} }
        console.log(data);
        this._notificationSystem.addNotification(data);

    }

    render() {
        const s = this.state;
        const p = s.loadedProps || this.props;
        let Component = s.currComponent;
        return <div>
            <NotificationSystem ref={(ns) => this._notificationSystem = ns}/>

            <Component
                {...p}
                reloadProps={this.handleReloadProps.bind(this)}
                _notification={this.handleNotifycation.bind(this)}
                _reloadProps={this.handleReloadProps.bind(this)}
                _goto={this.handleGoTo.bind(this)}
                _resolveComponent={this.handleReloadProps.bind(this)}
            />

        </div>

    }
}