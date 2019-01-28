import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './client/App';
import Html from './client/Html';
import Menu from "./client/Menu";
const path = require("path");

const port = 3000;
const server = express();

server.use(express.static(path.resolve(__dirname , '../public')));
server.use(express.static(path.resolve(__dirname )));

server.get('/', (req: any, res: any) => {
    /**
     * renderToString() will take our React app and turn it into a string
     * to be inserted into our Html template function.
     */
    const body = renderToString(<App />);
    const menu = renderToString(<Menu />);
    const title = 'Frontend-lib';

    //res.writeHead( 200, { "Content-Type": "text/html" } );
    res.send(
        Html({
            menu,
            body,
            title
        })
    );
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);