import * as React from "react";
import { BackofficeStore, IDebugDataEntry } from "./BackofficeStore";
import { useEffect, useState } from "react";
import { ideConnector } from "./IDEConnector";
import { LoadingIndicator } from "../LoadingIndicator";
import { PrintJSON } from "../PrintJSON";

import "./DebugCommLog.sass";

export default () => {
    const [log, setLog] = useState([...BackofficeStore.debugLog].reverse());

    useEffect(() => {
        BackofficeStore.registerDebugDataListener((log: IDebugDataEntry[]) => {
            const target = [...log];
            target.reverse();
            setLog(target);
        });
    }, []);

    return (
        <div className="w-debug-comm-log">
            <div className="w-debug-comm-log-title">
                <span>Comm Log</span>
                <a
                    onClick={() => {
                        BackofficeStore.cleanUpDebugData();
                    }}
                >
                    clear
                </a>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>time</th>
                        <th>route</th>
                        <th>url</th>
                        <th>type</th>
                        <th>response</th>
                        <th>input</th>
                    </tr>
                </thead>
                <tbody>
                    {log.map((el) => (
                        <RouteInfo info={el} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RouteInfo = ({ info }: { info: IDebugDataEntry }) => {
    const [expanded, setExpanded] = useState([]);
    const [doing, setDoing] = useState("");

    const [isConnectingWithIDE, setIsConnectingWithIDE] = useState("");

    const routeInfoClicked = (file: string, line: number) => {
        ideConnector.openFile(file, line, (devResponse) => {
            if (devResponse.status == "OK") {
                setIsConnectingWithIDE("Opened");
                setTimeout(() => setIsConnectingWithIDE(""), 100);
            } else {
                setTimeout(() => setIsConnectingWithIDE("Error: " + devResponse.error), 100);
            }
        });
    };

    const t = info.time;

    let tmpResponse = info.response;
    if (typeof tmpResponse == "string") {
        try {
            tmpResponse = JSON.parse(tmpResponse);
            tmpResponse = Object.keys(tmpResponse).length + " keys";
        } catch (e) {
            tmpResponse = "string:" + tmpResponse.length + " length";
        }
    } else {
        tmpResponse = Object.keys(tmpResponse).length + " keys";
    }

    return (
        <tr>
            <td>
                {t.getHours() +
                    ":" +
                    (t.getMinutes() < 10 ? "0" : "") +
                    t.getMinutes() +
                    ":" +
                    (t.getSeconds() < 10 ? "0" : "") +
                    t.getSeconds()}
            </td>
            <td>{info.routeInfo.routePath}</td>
            <td>
                <a href={info.url} target={"_blank"}>
                    {info.url}
                </a>
            </td>
            <td>{info.requestType}</td>
            <td>{tmpResponse} </td>
            <td>{Object.keys(info.input).length} keys</td>
            <td>
                {info.requestType == "view" && (
                    <a onClick={() => routeInfoClicked(info.routeInfo._debug.template + ".component.tsx", 1)}>
                        go to view
                    </a>
                )}
            </td>
            <td>
                <a onClick={() => routeInfoClicked(info.routeInfo._debug.file, info.routeInfo._debug.line)}>
                    go to code
                </a>
            </td>
            <td>{isConnectingWithIDE}</td>
        </tr>
    );
};
