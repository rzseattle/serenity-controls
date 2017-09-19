var chokidar = require('chokidar');
const fs = require('fs');

var setupFileObserver = function(BASE_PATH, SAVE_TARGET) {


    let watchedDirs = [
        {package: 'app', dir: BASE_PATH + '/app/views'},
        {package: 'access', dir: BASE_PATH + '/vendor/arrow/engine/src/packages/access/views'},
        {package: 'translations', dir: BASE_PATH + '/vendor/arrow/engine/src/packages/translations/views'}
    ];


    var walk = function (dir) {
        var results = [];
        if(fs.existsSync(dir)) {
            var list = fs.readdirSync(dir);
            list.forEach(function (file) {
                file = dir + '/' + file;
                var stat = fs.statSync(file);
                if (stat && stat.isDirectory()) {
                    results = results.concat(walk(file));
                } else {

                    if (file.match(/.*\.component\.js$/) || file.match(/.*\.component\.tsx$/)) {

                        let name = file.replace(dir, '');
                        name = name.replace(/\//g, '_');
                        name = name.replace('.component.js', '');
                        name = name.replace('.component.tsx', '');
                        results.push({
                            name: name,
                            path: file
                        });
                    }
                }
            });
        }
        return results;
    };


    const linkArrowDir = () => {
        let FileContent = '';
        watchedDirs.map(config => {
            walk(config.dir).forEach((entry) => {
                let name = entry.path.replace(config.dir + '/', '');
                name = name.replace(/\//g, '_');
                name = name.replace('.component.js', '');
                name = name.replace('.component.tsx', '');
                name = config.package + '_' + name;
                let data = {file: entry.path}

                FileContent += 'import ' + name + ' from \'' + entry.path.replace(/\\/g, '\\\\') + '\';\n';
                FileContent += 'ReactHelper.register(\'' + name + '\', ' + name + ', ' + JSON.stringify(data) + ');\n';
            });
        });

        fs.writeFile(SAVE_TARGET, FileContent, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });
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
            console.log(event, path);
            linkArrowDir();
        })
        .on('unlink', (event, path) => {
            console.log(event, path);
            linkArrowDir();
        });

}


module.exports = setupFileObserver;
