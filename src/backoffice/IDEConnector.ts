import { DevProperties } from "./DevProperties";
import { Comm } from "../lib";

declare var DEV_PROPERIES: DevProperties;

class IDEConnector {
    public openFile(file: string, line: number) {
        const base = Comm.basePath;
        Comm.basePath = "";
        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "openFile", { file, line }).then((devResponse) => {
            // noinspection TsLint
            console.log("Opening file");
        });
        Comm.basePath = base;
    }

    public createComponent(file: string) {
        const base = Comm.basePath;
        Comm.basePath = "";
        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "createFile", { file, type: "component" }).then(
            (devResponse) => {
                // noinspection TsLint
                console.log("Component created");
            },
        );
        Comm.basePath = base;
    }

    public createTemplate(file: string) {
        const base = Comm.basePath;
        Comm.basePath = "";
        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "createFile", { file, type: "template" }).then(
            (devResponse) => {
                // noinspection TsLint
                console.log("Template created");
            },
        );
        Comm.basePath = base;
    }

    public refreshRoute() {
        Comm._get("/utils/developer/getRoutes").then((response) => {
            Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "refreshRoute", {
                data: JSON.stringify(response),
            }).then((devResponse) => {
                // noinspection TsLint
                console.log("Dev response");
            });
        });
    }
}

export const ideConnector = new IDEConnector();
