var chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");
var exec = require("child_process").exec;


var setupFileObserver = function(BASE_PATH, SAVE_COMPONENT_TARGET, SAVE_SASS_TARGET) {

    const targetfilename = SAVE_COMPONENT_TARGET.replace("components.include", "components-route.include");

    const generateRouteAssetsFromJson = (conf) => {


        let ComponentFileContent = "";
        let ComponentFileContentMapFilesX = {};
        let SassFileContent = "";

        for (i in conf) {

            let componentPath = BASE_PATH + conf[i]._debug.template + ".component.tsx";
            let sassPath = BASE_PATH + conf[i]._debug.template + ".component.sass";

            if (fs.existsSync(componentPath)) {
                let name = (i + conf[i]._routePath)
                    .replace("/", "")
                    .replace(/\//g, "_")
                    .replace(/\{/g, "_")
                    .replace(/\}/g, "_")
                    .replace(/\-/g, "_")
                ;


                ComponentFileContent += "import " + name + " from '" + componentPath.replace(/\\/g, "/") + "';\n";
                ComponentFileContent += " export { " + name + "}; \n";
                conf[i].component = name;
                ComponentFileContentMapFilesX[i] = conf[i];
                if (fs.existsSync(sassPath)) {
                    SassFileContent += `.${name}\n`;
                    SassFileContent += `    @import "${sassPath.replace(/\\/g, "/")}";\n`;
                }
            } else {
                ComponentFileContentMapFilesX[i] = conf[i];
                if (componentPath.indexOf("access") != -1) {
                    //console.error(componentPath, "Dont exist");
                }
            }
        }
        ComponentFileContent += `\nexport const ViewFileMap = ${JSON.stringify(ComponentFileContentMapFilesX)} ;`;
        fs.writeFileSync(targetfilename, ComponentFileContent);
        fs.writeFileSync(SAVE_SASS_TARGET, SassFileContent);
    };


    let routeFileDir = path.resolve(BASE_PATH + "/data/cache/symfony/");
    let routeFile = routeFileDir + "/route.json";

    let lastKnownSizeOfRouteFile = -1;

    let newRouteFileGenerator = () => {
        //new router observation
        if (fs.existsSync(routeFile)) {

            const currentRuteFileSize = fs.statSync(routeFile).size;

            if (currentRuteFileSize != lastKnownSizeOfRouteFile || true) {
                lastKnownSizeOfRouteFile = currentRuteFileSize;

                let conf = JSON.parse(fs.readFileSync(routeFile));
                generateRouteAssetsFromJson(conf);
            }


        } else {
            console.log("Ni ma pliku wczytuje pusty");
            console.log(routeFileDir + "route.json");
            fs.writeFile(targetfilename, "export const ViewFileMap = {};", function(err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("The file was saved: " + targetfilename);
                }
            });
        }
    };

    console.log("startuje observera");
    const linkArrowDir = () => {
        console.log("uruchamiam");
        newRouteFileGenerator();
    };

    linkArrowDir();

    chokidar.watch(
        [routeFileDir],
        {
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 200,
                pollInterval: 100,
            },

        })
        .on("add", (event, path) => {
            linkArrowDir();
        })
        .on("change", (event, path) => {
            linkArrowDir();
        })
        .on("unlink", (event, path) => {
            linkArrowDir();
        });


    let routeEqualizer = "";
    let annotationChanged = (path, event) => {
        //console.log(path);
        if (path !== null) {
            if (path.indexOf("Controllers") == -1 && path.indexOf("views") == -1) {
                return;
            }
        }
        let command = "php bin\\console debug:router --json";
        console.log("Route check ...");
        exec(command, { cwd: BASE_PATH }, function(error, stdout, stderr) {
            if (!error) {
                let route = JSON.parse(stdout);
                const routeSimplyfied = Object.entries(route).map(([index, el]) => [el._controller, el._method, el._routePath, el._package, el._debug.templateExists]);
                const toEqual = JSON.stringify(routeSimplyfied);
                if (toEqual != routeEqualizer) {
                    routeEqualizer = toEqual;
                    generateRouteAssetsFromJson(route);
                } else {
                    console.log("No changes");
                }
            } else {
                console.log("not worked");
                console.log(stdout);
                console.log(stderr);
            }
        });
    };

    annotationChanged(null, null);

    chokidar.watch(
        [
            path.resolve(BASE_PATH, "./app/Controllers"),
            path.resolve(BASE_PATH, "./app/views"),
            path.resolve(BASE_PATH, "./vendor/arrow"),
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
