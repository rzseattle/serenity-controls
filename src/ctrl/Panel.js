import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Panel extends Component {

    static propTypes = {
        title: PropTypes.string,
        noPadding: PropTypes.bool,
        noBottomMargin: PropTypes.bool,
        toolbar: PropTypes.arrayOf(PropTypes.node),
        children: PropTypes.node
    };
    static defaultProps = {
        noPadding: false,
        noBottomMargin: true,
        children: null,
        title: "",
        toolbar: [],
    };

    render() {
        const props = this.props;
        let classes = ['w-panel'];
        if (this.props.noPadding) {
            classes.push('panel-no-padding')
        }
        if (this.props.noBottomMargin) {
            classes.push('panel-no-bottom-margin')
        }
        return (
            <div className={classes.join(' ')}>
                <div className="panel-body">
                    {props.title ? <div className="title">
                        {props.icon && <i className={'fa fa-' + props.icon} />}
                        {props.title}
                        <div className="panel-toolbar">{props.toolbar}</div>
                    </div> : ''}
                    {props.children}
                </div>
            </div>
        )
    }
}
