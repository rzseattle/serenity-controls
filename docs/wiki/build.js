const path = require("path");
const builder = require("./builder/builder.js")


const config = {
    targetDir: path.resolve(__dirname, "./../../website-build/wiki"),
    sourceDir: path.resolve(__dirname, "doc"),
    elements: [
        {title: "Hello to frontend", file: "index.md"},
        {title: "Embeding lib in project", file: "embeding.md"},
        {title: "Build system", file: "build-system.md"},
        //{title: "", file: ".md"},
    ],

}

builder( config )