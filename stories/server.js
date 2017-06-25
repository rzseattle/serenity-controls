let express = require('express');
let app = express();
require('babel-polyfill');
var fs = require('fs');
const path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'x-requested-with, Content-Type, origin, authorization, accept, client-security-token');
    next();
});


let paginate = (array, page_size, page_number) => {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);

}

function fieldSorter(fields) {
    return (a, b) => fields.map(o => {
        let dir = 1;
        if (o[0] === '-') { dir = -1; o=o.substring(1); }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p,n) => p ? p : n, 0);
}

app.all('/table/base', function (req, res) {

    let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, './table/MOCK_DATA.json')));
    var all = data.length;


    for (let i in req.body.filters) {
        let col = req.body.order[i];
    }

    var sorterData  = [];
    for (let i in req.body.order) {
        let col = req.body.order[i];
        sorterData.push( (col.dir=='desc'?'-':'')+col.field )
    }
    if(sorterData.length > 0)
        data = data.sort(fieldSorter(sorterData));



    data = paginate(data, req.body.onPage, req.body.currentPage);


    const response = {
        data: data,
        countAll: all,
        debug: false
    }
    res.json(response);
})
;
app.listen(3001);
console.log('Listening on port 3001...');