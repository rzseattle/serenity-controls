var glob = require("glob");
var fs = require("fs");

glob("src/**/*.sass", {}, function(er, files) {
    for (let file of files) {
        fs.copyFile(file, file.replace("src/", "lib/"), () => {});
    }
});
