import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';
import Html from './client/Html';
import Menu from "./client/Menu";
const path = require("path");

const port = 3000;
const server = express();

server.use(express.static(path.resolve(__dirname , '../../docs/website/public')));
server.use( "/wiki", express.static(path.resolve(__dirname , '../wiki')));
server.use( "/storybook", express.static(path.resolve(__dirname , '../storybook')));
server.use( "/api", express.static(path.resolve(__dirname , '../api')));
server.use( "/dist", express.static(path.resolve(__dirname , '../dist')));

//server.use(express.static(path.resolve(__dirname )));

server.get('/', (req: any, res: any) => {
    /**
     * renderToString() will take our React app and turn it into a string
     * to be inserted into our Html template function.
     */
    const body = renderToString(<App />);

    const title = 'Frontend-lib';

    //res.writeHead( 200, { "Content-Type": "text/html" } );
    res.send(
        Html({
            body,
            title
        })
    );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);