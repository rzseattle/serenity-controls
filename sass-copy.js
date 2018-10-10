var glob = require("glob");
var fs = require("fs");

glob("src/**/*.sass", {}, function(er, files) {
    for (let file of files) {
        fs.copyFile(file, file.replace("src/", "lib/"), () => {});
    }
});

glob("lib/src/**/*.*", {}, function(er, files) {
    for (let file of files) {
        fs.renameSync(file, file.replace("lib/src/", "lib/"), () => {});
    }

    var rimraf = require("rimraf");
    rimraf("lib/src", () => {});
});
