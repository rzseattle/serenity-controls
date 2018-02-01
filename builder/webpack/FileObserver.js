var chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

var setupFileObserver = function (BASE_PATH, SAVE_COMPONENT_TARGET, SAVE_SASS_TARGET) {


    let routeFileDir = path.resolve(BASE_PATH + '/data/cache/symfony/');
    let targetfilename = SAVE_COMPONENT_TARGET.replace("components.include", "components-route.include");

    let watchedDirs = [
        {package: 'app', dir: BASE_PATH + '/application/views'},
        {package: 'app', dir: BASE_PATH + '/app/views'},
        {package: 'access', dir: BASE_PATH + '/vendor/arrow/engine/src/packages/access/views'},
        {package: 'translations', dir: BASE_PATH + '/vendor/arrow/engine/src/packages/translations/views'},
        {package: 'utils', dir: BASE_PATH + '/vendor/arrow/engine/src/packages/utils/views'},
        {package: '', dir: routeFileDir}
    ];

    let newRouteFileGenerator = () => {
    }


    //new router observation
    if (fs.existsSync(routeFileDir + "/route.json")) {


        newRouteFileGenerator = () => {


            targetfilename = SAVE_COMPONENT_TARGET.replace("components.include", "components-route.include");


            let conf = JSON.parse(fs.readFileSync(routeFileDir + "/route.json"));


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


    var walk = function (dir) {
        console.log("here3")
        var components = [];
        var sass = [];
        if (fs.existsSync(dir)) {
            var list = fs.readdirSync(dir);
            list.forEach(function (file) {
                file = dir + '/' + file;
                var stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    let [c, s] = walk(file);
                    components = components.concat(c);
                    sass = sass.concat(s);
                } else {
                    if (file.match(/.*\.component\.js$/) || file.match(/.*\.component\.tsx$/)) {
                        components.push(file);
                    } else if (file.match(/.*\.component\.sass$/)) {
                        sass.push(file);
                    }
                }
            });
        }

        return [components, sass];
    };


    const linkArrowDir = () => {
        newRouteFileGenerator();

        if (false) {
            let ComponentFileContent = '';
            let ComponentFileContentEx = [];
            let ComponentFileContentMapFiles = {};
            let SassFileContent = '';
            watchedDirs.map(config => {

                let [components, sass] = walk(config.dir);
                components.forEach((entry) => {
                    let name = entry.replace(config.dir + '/', '');
                    name = name.replace(/\//g, '_');
                    name = name.replace('.component.js', '');
                    name = name.replace('.component.tsx', '');
                    name = config.package + '_' + name;
                    let data = {file: entry}

                    ComponentFileContent += 'import ' + name + ' from \'' + entry.replace(/\\/g, '/') + '\';\n';
                    //ComponentFileContent += `export ${name};\n`;
                    ComponentFileContentMapFiles[name] = entry.replace(/\\/g, '/');
                    ComponentFileContentEx.push(name)
                });
                sass.forEach((entry) => {
                    let name = entry.replace(config.dir + '/', '');
                    name = name.replace(/\//g, '_');
                    name = name.replace('.component.sass', '');
                    name = config.package + '_' + name;
                    SassFileContent += `.${name}\n`;
                    SassFileContent += `    @import "${entry.replace(/\\/g, "/")}";\n`;

                });


            });
            //file router enabled/disabled

            ComponentFileContent += `\nexport{ ${ComponentFileContentEx.join(",")} };`;
            ComponentFileContent += `\nexport const ViewFileMap = ${JSON.stringify(ComponentFileContentMapFiles)} ;`;

            fs.writeFileSync(SAVE_COMPONENT_TARGET, ComponentFileContent);
            fs.writeFileSync(SAVE_SASS_TARGET, SassFileContent);

        }


    };

    linkArrowDir();


    let dirs = watchedDirs.reduce((p, c) => {
        p.push(c.dir);
        return p;
    }, []);


    chokidar.watch(
        dirs,
        {
            ignored: /(^|[\/\\])\../,
            ignoreInitial: true

        })
        .on('add', (event, path) => {
            linkArrowDir();
        })
        .on('unlink', (event, path) => {
            linkArrowDir();
        });


}


module.exports = setupFileObserver;
