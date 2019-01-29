import React from "react";
//import { hot } from 'react-hot-loader/root'

const Menu = () => (
    <>
        <ul>
            <li className="current_page_item">
                <a href="/" accessKey="1" title="You are here">
                    Homepage
                </a>
            </li>
            <li>
                <a
                    onClick={() => {
                        window.open("/storybook");
                    }}
                    target="_blank"
                    accessKey="2"
                    title="Storybook"
                >
                    Storybook{" "}
                </a>
            </li>
            <li>
                <a
                    onClick={() => {
                        window.open("/wiki");
                    }}
                    accessKey="3"
                    title="Basic doc"
                >
                    Wiki
                </a>
            </li>
            <li>
                <a
                    onClick={() => {
                        window.open("/api");
                    }}
                    accessKey="4"
                    title="API"
                >
                    API Doc
                </a>
            </li>
        </ul>
    </>
);

export default Menu;
