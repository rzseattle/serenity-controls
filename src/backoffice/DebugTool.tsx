import * as React from "react";
import { Icon } from "../Icon";
import Tooltip from "../Tooltip/Tooltip";
import { PrintJSON } from "../PrintJSON";
import { BackofficeStore, IDebugDataEntry } from "./BackofficeStore";
import "./DebugTool.sass";
import { useState } from "react";
import { ideConnector } from "./IDEConnector";
const ReactJson = React.lazy(() => import("react-json-view"));
import { Modal } from "../Modal";
import { LoadingIndicator } from "../LoadingIndicator";

const DebugTool = () => {
    return (
        <div className="w-debug-tool">
            <StoryBookHelper />
            <JSON2TypescriptHelper />
            <Tooltip template={() => <DebugToolBody />} theme="light" layerClass="w-debug-tool-tooltip">
                <Icon name={"Code"} />
            </Tooltip>
        </div>
    );
};

const DebugToolBody = () => {
    return (
        <div className="w-debug-tool-body">
            <h3>Views</h3>
            {BackofficeStore.debugData.views.map((el) => (
                <RouteInfo info={el} />
            ))}
            <h3>Ajax</h3>
            {BackofficeStore.debugData.ajax.map((el) => (
                <RouteInfo info={el} />
            ))}
            <hr />
        </div>
    );
};

const RouteInfo = ({ info }: { info: any }) => {
    const [expanded, setExpanded] = useState([]);
    const [doing, setDoing] = useState("");

    const routeInfoClicked = (file: string, line: number) => {
        ideConnector.openFile(file, line, (devResponse) => {
            if (devResponse.status == "OK") {
                setDoing("Opened");
                setTimeout(() => setDoing(""), 100);
            } else {
                setTimeout(() => setDoing("Error: " + devResponse.error), 100);
            }
        });
    };

    return (
        <div>
            {doing != "" && <pre>{doing}</pre>}
            {info.urls.map((url: string, urlIndex: number) => (
                <React.Fragment key={url}>
                    <div
                        className="w-debug-tool-url"
                        onClick={() => {
                            if (expanded.includes(urlIndex)) {
                                setExpanded(expanded.filter((el) => el != urlIndex));
                            } else {
                                setExpanded([...expanded, urlIndex]);
                            }
                        }}
                    >
                        {url}
                    </div>
                    {expanded.includes(urlIndex) && (
                        <>
                            <small>
                                <table className={"w-debug-info-table"}>
                                    <tbody>
                                        <tr>
                                            <td>Route:</td>
                                            <td> {info.routeInfo.path}</td>
                                        </tr>
                                        <tr>
                                            <td>Controller:</td>
                                            <td>{info.routeInfo.extendedInfo._controller}</td>
                                        </tr>
                                        <tr>
                                            <td>Place:</td>
                                            <td>
                                                <a
                                                    onClick={() =>
                                                        routeInfoClicked(
                                                            info.routeInfo.extendedInfo._debug.file,
                                                            info.routeInfo.extendedInfo._debug.line,
                                                        )
                                                    }
                                                >
                                                    {info.routeInfo.extendedInfo._debug.file}:
                                                    {info.routeInfo.extendedInfo._debug.line}
                                                </a>
                                            </td>
                                        </tr>
                                        {info.routeInfo.extendedInfo._debug.componentExists && (
                                            <tr>
                                                <td>Template:</td>
                                                <td>
                                                    <a
                                                        onClick={() =>
                                                            routeInfoClicked(
                                                                info.routeInfo.extendedInfo._debug.template +
                                                                    ".component.tsx",
                                                                1,
                                                            )
                                                        }
                                                    >
                                                        {info.routeInfo.extendedInfo._debug.template}.component.tsx
                                                    </a>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </small>

                            {/*<PrintJSON json={info.props[urlIndex]} />*/}
                            <div className="w-debug-tool-props">
                                <React.Suspense fallback={<LoadingIndicator />}>
                                    <ReactJson
                                        src={info.props[urlIndex]}
                                        theme="monokai"
                                        displayDataTypes={false}
                                        name={false}
                                    />
                                </React.Suspense>
                            </div>
                        </>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const StoryBookHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <Icon name={"DietPlanNotebook"} />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="http://frontend-lib.org:3000/storybook/" />
                </div>
            </Modal>
        </>
    );
};

const JSON2TypescriptHelper = () => {
    const [opened, setOpened] = useState(false);
    return (
        <>
            <span onClick={() => setOpened(true)}>
                <Icon name={"TypeScriptLanguage"} />
            </span>
            <Modal show={opened} title="Storybook helper" showHideLink={true} onHide={() => setOpened(false)}>
                <div className="w-debug-tool-storybook">
                    <iframe src="https://transform.now.sh/json-to-ts-interface/" />
                </div>
            </Modal>
        </>
    );
};

export default DebugTool;
