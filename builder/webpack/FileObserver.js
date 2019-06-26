var chokidar = require("chokidar");

const path = require("path");
const extractor = require("./RouteExtractor.js");


var setupFileObserver = function (BASE_PATH, SAVE_COMPONENT_TARGET, SAVE_SASS_TARGET) {

    let routeEqualizer = "";
    let annotationChanged = (path, event) => {
        //console.log(path);
        if (path !== null) {
            if (path.indexOf("Controllers") == -1 && path.indexOf("views") == -1) {
                return;
            }
        }
        extractor(BASE_PATH, SAVE_COMPONENT_TARGET, SAVE_SASS_TARGET);

    };

    annotationChanged(null, null);

    chokidar.watch(
        [
            path.resolve(BASE_PATH, "./app/Controllers"),
            path.resolve(BASE_PATH, "./app/views"),
            path.resolve(BASE_PATH, "./libs/engine"),
        ],
        {
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true,
            /*awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            },*/

        })
        .on("add", (event, path) => {
            annotationChanged(event, path);
        })
        .on("change", (event, path) => {
            annotationChanged(event, path);
        })
        .on("unlink", (event, path) => {
            annotationChanged(event, path);
        });
};


module.exports = setupFileObserver;
