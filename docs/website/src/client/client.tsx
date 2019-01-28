import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import Menu from "./Menu";

hydrate(<Menu />, document.getElementById('menu'));