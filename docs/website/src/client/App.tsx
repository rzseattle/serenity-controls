import React from "react";
import Menu from "./Menu";

const App = () => {
    return (
        <>
            <div id="header-wrapper">
                <div id="header" className="container">
                    <div id="logo">
                        <h1>
                            <a href="/">Frontend-lib</a>
                        </h1>
                    </div>

                    <div id="menu">
                        <Menu />
                    </div>
                </div>
            </div>
            <div id="header-featured" />

            <div id="wrapper">
                <div id="featured-wrapper">
                    <div id="featured" className="container">
                        <div className="column1">
                            <span className="icon icon-cogs" />
                            <div className="title">
                                <h2>Builder</h2>
                            </div>
                            <p>Building envoirment for js aps</p>
                        </div>
                        <div className="column2">
                            <span className="icon icon-legal" />
                            <div className="title">
                                <h2>Backoffice panel</h2>
                            </div>
                            <p>Panel providing routing/context/tools.</p>
                        </div>
                        <div className="column3">
                            <span className="icon icon-unlock" />
                            <div className="title">
                                <h2>Controls</h2>
                            </div>
                            <p style={{color: "white"}} >Controlset for any occassion.</p>
                        </div>
                        <div className="column4">
                            <span className="icon icon-wrench" />
                            <div className="title">
                                <h2>Develop tools</h2>
                            </div>
                            <p>Live reloading, code finding, errors debuging.</p>
                        </div>
                    </div>
                </div>
                <div id="extra" className="container" />

            </div>
        </>
    );
};

export default App;
