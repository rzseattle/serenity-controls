import * as React from "react";
import {deepIsEqual} from "frontend/src/lib/JSONTools";
import {withFilterOpenLayer} from '../Filters'
import {Icon} from "frontend/src/ctrl/Icon";
import {tooltip} from "frontend/src/ctrl/Overlays";


export default class Thead extends React.Component<any, any> {

    public tooltipCleanup: any;

    constructor(props) {
        super(props);
        this.tooltipCleanup = null;
    }


    shouldComponentUpdate(nextProps, nextState) {
        return !deepIsEqual(
            [
                this.props.columns,
                this.props.filters,
                this.props.order
            ],
            [
                nextProps.columns,
                nextProps.filters,
                nextProps.order
            ]
        )
    }


    render() {
        return <thead>
        <tr>
            {this.props.selectable ?
                <th className="w-table-selection-header" onClick={this.props.onCheckAllClicked}>
                    <input type="checkbox" checked={this.state.allChecked}/>
                </th>
                : null
            }
            {this.props.columns.filter(el => el !== null && el.display === true).map((el, index) => {

                const Component = el.filter.length > 0 ? withFilterOpenLayer(el.filter) : null;
                let classes = []
                if (this.props.order[el.field] !== undefined) {
                    classes.push('w-table-sorted w-table-sorted-' + this.props.order[el.field].dir)
                }
                if (this.props.filters[el.field] !== undefined) {
                    classes.push('w-table-filtered')
                }
                return <th key={index}
                           style={{width: el.width}}
                           className={classes.join(' ')}
                           onClick={(e) => this.props.onCellClicked(index, e)}
                           onMouseEnter={(e) => {
                               if (el.header.tooltip && this.tooltipCleanup === null) {
                                   e.persist();
                                   this.tooltipCleanup = tooltip(el.header.tooltip, {
                                       target: () => e.target,
                                       layer: false,
                                       orientation: "top"
                                   });
                               }
                           }}
                           onMouseLeave={(e) => {
                               if (el.header.tooltip) {
                                   this.tooltipCleanup();
                                   this.tooltipCleanup = null;
                               }
                           }}
                >
                    {el.order ? <i className={'fa fa-' + (el.order == 'asc' ? 'arrow-down' : 'arrow-up')}></i> : ''}
                    {el.header.icon && <Icon name={el.header.icon}/>}
                    {el.caption}
                    {el.filter.length > 0 ? <Component showApply={true} onApply={this.props.onFilterChanged}/> : ''}

                </th>;
            })}
        </tr>
        </thead>
    }
}


