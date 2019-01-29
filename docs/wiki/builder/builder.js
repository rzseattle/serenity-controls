let { MenuTemplate, PageTemplate } = require("./template");


const defaultConfig = {
    menuTemplate: MenuTemplate,
    pageTemplate: PageTemplate
}

const buildWiki = (config) => {

    config = {...defaultConfig, config};

    var MarkdownIt = require("markdown-it");
    var fs = require("fs");
    var path = require("path");

    const md = new MarkdownIt();

    const filesInDir = fs.readdirSync(__dirname);

    const targetDir = path.resolve(__dirname + "/dist");

    if (fs.existsSync(targetDir)) {
        //fs.rmdirSync(targetDir);
        var rimraf = require("rimraf");
        rimraf.sync(targetDir);
    }

    fs.mkdirSync(targetDir);

    let output = [];
    filesInDir.forEach((el) => {
        if (el.indexOf(".md") != -1) {
            var result = md.parse(fs.readFileSync(__dirname + "/" + el, "utf8"));
            var content = md.render(fs.readFileSync(__dirname + "/" + el, "utf8"));
            let title = el.replace(".md", "");
            if (result[0].tag == "h1") {
                title = result[1].content;
                console.log(title);
            }

            output.push({ title, file: el, content });
        }
    });

    const menu = MenuTemplate(output);

    output.forEach((el) => {
        fs.writeFileSync(
            targetDir + "/" + el.file.replace(".md", ".html"),
            PageTemplate({ menu, content: el.content }),
        );
    });
};

module.exports = buildWiki;
