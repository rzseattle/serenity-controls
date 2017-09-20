"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function default_1(props) {
    var isVisible = Object.entries(props.order).length > 0 || Object.entries(props.filters).length > 0;
    return (<div className={'w-table-presenter ' + (!isVisible ? 'w-table-presenter-hidden' : '')}>
            <div className="w-table-presenter-inner">
                {Object.entries(props.order).map(function (_a, index) {
        var field = _a[0], el = _a[1];
        return <div key={index}>
                        <div><i className={'fa fa-' + (el.dir == 'asc' ? 'arrow-down' : 'arrow-up')}></i></div>
                        <div className="caption">{el.caption}</div>
                        <div className="remove" onClick={function (e) { return props.orderDelete(field); }}><i className="fa fa-times"></i></div>
                    </div>;
    })}


                {Object.entries(props.filters).map(function (_a) {
        var key = _a[0], el = _a[1];
        return <div key={key}>
                        <div><i className="ms-Icon ms-Icon--Filter"></i></div>
                        <div className="caption">{el.caption}</div>
                        <div className="value" dangerouslySetInnerHTML={{ __html: el.label }}/>
                        <div className="remove" onClick={function (e) { return props.FilterDelete(key); }}><i className="fa fa-times"></i></div>
                    </div>;
    })}
            </div>
        </div>);
}
exports.default = default_1;
