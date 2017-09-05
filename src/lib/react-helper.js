import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader';
import ErrorReporter from './ErrorReporter';

/**
 * react-helper.js
 *
 * Helper for Facebook's React UI Library. Add support for declare
 * component on DOM (similar to AngularJS Directive).
 *
 * Usage:
 * - Register a component:
 *   ReactHelper.register('MyComponent', MyComponent)
 * - Declare the DOM node:
 *   <div react-component="MyComponent" react-props="{'name':'value'}"
 * - There is no step 3!
 */

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

let registry = {};

window.ReactHelper = {

    initComponents: function (context = document) {

        const selector = '[react-component],[data-react-component]';

        context.querySelectorAll(selector).forEach((node) => {
            name =
                node.getAttribute('react-component') ||
                node.getAttribute('data-react-component');
            this.initComponent(name, node)

        });

    },


    register: function (name, constructor, data = {}) {
        registry[name] = {_obj: constructor, data: data };
    },

    get: function (name) {
        return this.getWithData(name)['_obj'];
    },

    getWithData: function(name){
        if (registry[name] == undefined) {
            console.error('[React-helper] Cannot find `' + name + '` registred object');
            console.log('Registred components');
            console.log(registry);
            return;
        }
        return registry[name];
    },


    initComponent: function (name, node) {

        let props = node.getAttribute('react-props') ||
            node.getAttribute('data-react-props') || null;
        if (props != null)
            props = window[props];


        if (!registry[name]) {
            console.error(`'${name}' component not registred `)
            return;
        }

        let Component = registry[name]['_obj'];

        ReactDOM.render((
                <AppContainer errorReporter={ErrorReporter}>
                    <Component {...props} />
                </AppContainer>
            ), node
        );


    }
};
