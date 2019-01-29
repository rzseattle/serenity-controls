const MenuTemplate = (output) => {
    return "<ul>" + output.reduce((p, c) => p + `<li><a href='${c.file.replace(".md", ".html")}'>${c.title}</a></li>`, "") + "</ul>";
};
const PageTemplate = (Template = ({ menu, content }) => {
    return `<html>
<head>
<title>Frontend wiki</title>
<link rel="stylesheet" href="https://stackedit.io/style.css" />
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/themes/prism.min.css">
<style>
    .menu a{
        text-decoration: none;
    }
</style>
</head>
    <body>
    <table>
    <tr>
        <td style="vertical-align: top; width: 300px">
            <h1>Frontend Lib</h1>
            <div class="menu">
            ${menu}
            </div>
        </td>
        <td>${content}</td>
    </tr>
    </table>
    <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/prism.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-json.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/prism/1.5.1/components/prism-javascript.min.js"></script>
    </body>
    </html>`;
});

module.exports = { MenuTemplate, PageTemplate };
