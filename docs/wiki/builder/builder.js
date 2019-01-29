let { MenuTemplate, PageTemplate } = require("./template");
var fs = require("fs");

const defaultConfig = {
    menuTemplate: MenuTemplate,
    pageTemplate: PageTemplate,
};

const buildWiki = (config) => {
    config = { ...defaultConfig, ...config };

    var MarkdownIt = require("markdown-it");

    const md = new MarkdownIt();

    if (fs.existsSync(config.targetDir)) {
        var rimraf = require("rimraf");
        rimraf.sync(config.targetDir);
    }

    fs.mkdirSync(config.targetDir, { recursive: true });

    let output = [];
    config.elements.forEach((el) => {
        const fileContent = fs.readFileSync(config.sourceDir + "/" + el.file, "utf8");
        const content = md.render(fileContent);
        output.push({ title: el.title, file: el.file, content });
    });

    const menu = config.menuTemplate(output);

    output.forEach((el) => {
        fs.writeFileSync(
            config.targetDir + "/" + el.file.replace(".md", ".html"),
            config.pageTemplate({ menu, content: el.content }),
        );
    });
};

module.exports = buildWiki;
