import { DevProperties } from "./DevProperties";
import { Comm } from "../lib";

declare var DEV_PROPERIES: DevProperties;

class IDEConnector {
    public openFile(
        file: string,
        line: number,
        callback: (response: { status: "OK" | "ERROR"; error?: string }) => any = null,
    ) {
        const base = Comm.basePath;
        Comm.basePath = "";
        console.log("Opening file");
        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "openFile", { file, line }).then((devResponse) => {
            // noinspection TsLint
            console.log("File opened");
            if (callback) {
                callback(devResponse);
            }
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

    public createURLFile(url: string, post: {}) {
        const base = Comm.basePath;
        Comm.basePath = "";
        const address = window.location.protocol + "//" + window.location.host + Comm.basePath + url;
        const sessionCookieName = "session";

        const getCookie = (name: string) => {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2)
                return parts
                    .pop()
                    .split(";")
                    .shift();
        };

        Comm._post(JSON.parse(DEV_PROPERIES.build_domain) + "createURLFile", {
            data:
                "POST " +
                address +
                "\nCookie: " +
                sessionCookieName +
                "=" +
                getCookie(sessionCookieName) +
                "\n\n" +
                JSON.stringify(post, null, 2),
        }).then((devResponse) => {
            // noinspection TsLint
            console.log("Template created");
        });
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
