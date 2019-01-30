import * as React from "react";
import { Icon } from "../Icon";
import Tooltip from "../Tooltip/Tooltip";
import { PrintJSON } from "../PrintJSON";
import { BackofficeStore, IDebugDataEntry } from "./BackofficeStore";
import "./DebugTool.sass";

const DebugTool = () => {
    return (
        <div style={{ backgroundColor: "lightgrey", color: "black", padding: "0 10px" }}>
            <Tooltip template={() => <DebugToolBody />} theme="light" autoOpen={true}>
                <Icon name={"Edit"} />
            </Tooltip>
        </div>
    );
};

const DebugToolBody = () => {
    return (
        <div style={{ maxHeight: "90vh", overflow: "auto" }}>
            <h3>Views</h3>
            {BackofficeStore.debugData.views.map((el) => (
                <RouteInfo info={el} />
            ))}
            <h3>Ajax</h3>
            {BackofficeStore.debugData.ajax.map((el) => (
                <RouteInfo info={el} />
            ))}
        </div>
    );
};

const RouteInfo = ({ info }: { info: any }) => {
    return (
        <div style={{}}>
            {info.urls}
            <small>
                <table className={"w-debug-info-table"}>
                    <tr>
                        <td>Route:</td>
                        <td> {info.routeInfo.path}</td>
                    </tr>
                    <tr>
                        <td>Controller:</td> <td>{info.routeInfo.extendedInfo._controller}</td>
                    </tr>
                    <tr>
                        <td>Place:</td>{" "}
                        <td>
                            {info.routeInfo.extendedInfo._debug.file}:{info.routeInfo.extendedInfo._debug.line}
                        </td>
                    </tr>
                    {info.routeInfo.extendedInfo._debug.componentExists && (
                        <tr>
                            <td>Template:</td> <td>{info.routeInfo.extendedInfo._debug.template}.component.tsx</td>
                        </tr>
                    )}
                </table>
            </small>

            {info.props.map((prop: any, key: number) => (
                <pre key={key}>
                    <PrintJSON json={prop} />
                </pre>
            ))}
        </div>
    );
};

export default DebugTool;

/*
*


  "urls": [
    "/access/points/list"
  ],
  "props": [
    {
      "agroups": {
        "8": "Klienci",
        "16": "Handlowcy",
        "32": "Tumacze",
        "64": "Handlowcy [ Kierownik ]",
        "128": "Sklepy partnerskie",
        "256": "Tylko produkty - zdjęcia",
        "512": "Regeneracja",
        "1024": "Magazyn [kierownik]",
        "2048": "Reklamacje",
        "4096": "Opiekunowie",
        "8192": "Raporty",
        "16384": "Marketing",
        "32768": "Produkcja",
        "65536": "CRM",
        "131072": "England",
        "262144": "Raporty - bez definiowania",
        "524288": "Raporty - zapytania SQL",
        "1048576": "Automat",
        "2097152": "Logistyk",
        "4194304": "Produkcja - Kierownik",
        "8388608": "Raporty - zakupy",
        "16777216": "Raporty - logistyka",
        "33554432": "Raporty - logistyka wewnętrzna",
        "67108864": "Raporty - sprzedaż",
        "134217728": "Raporty - regeneracja",
        "268435456": "Raporty - produkcja"
      }
    }
  ],
  "routeInfo": {
    "baseURL": "/access/points",
    "path": "/access/points/list",
    "extendedInfo": {
      "_controller": "Arrow\\Access\\Controllers\\Points",
      "_method": "list",
      "_package": "access",
      "_routePath": "/access/points/list",
      "_baseRoutePath": "/access/points",
      "_debug": {
        "file": "/vendor/arrow/engine/src/packages/access/Controllers/Points.php",
        "line": 71,
        "template": "/vendor/arrow/engine/src/packages/access/views/points/list",
        "componentExists": true,
        "templateExists": false
      },
      "componentName": "access_points_list_access_points_list",
      "index": 5,
      "namespace": "access"
    }
  },
  "instances": 1
}

*
* */
