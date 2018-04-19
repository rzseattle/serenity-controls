import Comm from "../lib/Comm";
import { DevProperties } from "./DevProperties";

declare var DEV_PROPERIES: DevProperties;

class IDEConnector {
    constructor() {}

    public openFile(file, line) {
        console.log(`Opening file: ${file}:${line}`);
        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "openFile", { file, line }).then((devResponse) => {
            console.log("Opening file");
        });
    }

    public refreshRoute() {
        Comm._get("/utils/developer/getRoutes").then((response) => {
            Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "refreshRoute", { data: JSON.stringify(response) }).then((devResponse) => {
                console.log("Dev response");
            });
        });
    }
}

export const ideConnector = new IDEConnector();
