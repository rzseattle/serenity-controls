var chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

var setupFileObserver = function (BASE_PATH, SAVE_COMPONENT_TARGET, SAVE_SASS_TARGET) {


    let routeFileDir = path.resolve(BASE_PATH + '/data/cache/symfony/');
    let routeFile = routeFileDir + "/route.json";
    let targetfilename = SAVE_COMPONENT_TARGET.replace("components.include", "components-route.include");

    let lastKnownSizeOfRouteFile = -1

    let newRouteFileGenerator = () => {
        //new router observation
        if (fs.existsSync(routeFile)) {

            const currentRuteFileSize = fs.statSync(routeFile).size;

            if (currentRuteFileSize != lastKnownSizeOfRouteFile || true) {
                lastKnownSizeOfRouteFile = currentRuteFileSize;


                targetfilename = SAVE_COMPONENT_TARGET.replace("components.include", "components-route.include");

                let conf = JSON.parse(fs.readFileSync(routeFile));


                let ComponentFileContent = "";
                let ComponentFileContentMapFilesX = {};
                let SassFileContent = "";
                for (i in conf) {

                    let componentPath = BASE_PATH + conf[i]._debug.template + ".component.tsx";
                    let sassPath = BASE_PATH + conf[i]._debug.template + ".component.sass";

                    if (fs.existsSync(componentPath)) {
                        let name = i
                            .replace("/", "")
                            .replace(/\//g, "_")
                            .replace(/\{/g, "_")
                            .replace(/\}/g, "_")
                            .replace(/\-/g, "_")
                        ;
                        ComponentFileContent += 'import ' + name + ' from \'' + componentPath.replace(/\\/g, '/') + '\';\n';
                        ComponentFileContent += ' export { ' + name + '}; \n';
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
                console.log("podamieniam");
                ComponentFileContent += `\nexport const ViewFileMap = ${JSON.stringify(ComponentFileContentMapFilesX)} ;`;
                fs.writeFileSync(targetfilename, ComponentFileContent);
                fs.writeFileSync(SAVE_SASS_TARGET, SassFileContent);

            }


        } else {
            console.log("Ni ma pliku wczytuje pusty");
            console.log(routeFileDir + "route.json");
            fs.writeFile(targetfilename, "export const ViewFileMap = {};", function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log('The file was saved: ' + targetfilename);
                }
            });
        }
    }

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
                stabilityThreshold: 2000,
                pollInterval: 100
            },

        })
        .on('add', (event, path) => {
            linkArrowDir();
        })
        .on('change', (event, path) => {
            linkArrowDir();
        })
        .on('unlink', (event, path) => {
            linkArrowDir();
        });


}


module.exports = setupFileObserver;
