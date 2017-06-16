import React, {Component} from 'react';
import PropTypes from 'prop-types';



const Container = (props) => {
    return (
        <div className="container">{props.children}</div>
    )
}
Container.propTypes = {
    children: PropTypes.node.isRequired,
}


const Row = (props) => {

    const children = Array.isArray(props.children) ? props.children : [props.children];

    let colMd = 0
    let colsMd = [];
    //if detailed width delivered
    if (props.md) {
        let sum = props.md.reduce((a, b) => a + b, 0);
        if (sum > 12) {
            throw new Error(`To many columns ${sum}`);
        }
        //calculating width for rest of columns
        colMd = (12 - sum) / (children.length - props.md.length );
        colsMd = props.md;
    } else {
        //equal width for each element
        colMd = 12 / children.length;
    }

    //adding calculated default row width
    for (let i = colsMd.length; i < 12; i++) {
        colsMd[i] = Math.floor(colMd);
    }

    let style = {};
    if(props.noGutters) {
        style.padding = 0;
        style.margin = 0;
    }
    return (
        <div className="row">
            {children.map((child, key) =>
                <div key={key} style={style} className={'col-md-' + colsMd[key]}>{child}</div>
            )}
        </div>
    )
}

Row.propTypes = {
    children: PropTypes.node.isRequired,
    md: PropTypes.array,
    noGutters: PropTypes.bool
}

Row.defaultProps = {
    noGutters: true
}

/*
* <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
  </Tabs>
*
* */




export { Row, Container }