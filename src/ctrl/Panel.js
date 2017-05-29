import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Panel extends Component {

    static propTypes = {
        title: PropTypes.string,
        noPadding: PropTypes.bool,
        noBottomMargin: PropTypes.bool,
    };
    static defaultProps = {
        noPadding: false,
        noBottomMargin: true
    }

    render() {
        const props = this.props
        let classes = ['panel']
        if (this.props.noPadding) {
            classes.push('panel-no-padding')
        }
        if (this.props.noBottomMargin) {
            classes.push('panel-no-bottom-margin')
        }
        return (
            <div className={classes.join(" ")}>
                <div className="panel-body">
                    {props.title ? <div className="title">{props.title}
                        <div className="panel-toolbar">{props.toolbar}</div>
                    </div> : ''}
                    {props.children}
                </div>
            </div>
        )
    }
}
