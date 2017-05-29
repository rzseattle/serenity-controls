import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default Navbar = (props) => {

    let children = Array.isArray(props.children) ? props.children : [props.children];

    return (
        <div className="row">
            <div className="col-md-12">
                <nav className="navbar " role="navigation">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">

                            <li>
                                <ol className="breadcrumb">
                                    {children.map((child, key) =>
                                        <li key={key} className={key + 1 == props.children.length ? 'active' : ''}>
                                            {child}
                                        </li>
                                    )}

                                </ol>
                            </li>
                            {/*<li>Tutaj coś  jeszcze może być</li>*/}
                        </ul>
                        <div style={{float: 'right'}}>
                            <div style={{display: 'table-cell', height: '50px', verticalAlign: 'middle'}}>
                                {props.toolbar}
                            </div>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    children: PropTypes.node.isRequired
}

