const http = require('http');
const fs = require('fs');
const path = require('path');

function fairuOkuru(res, fairuMei, code) {
    const fairubasho = path.join(__dirname, 'pages', fairuMei);
    fs.readFile(fairubasho, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }
        res.writeHead(code || 200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
}

const saaba = http.createServer(function(req, res) {
    const pasu = req.url;
    if (pasu === '/') {
        fairuOkuru(res, 'index.html');
    } else if (pasu === '/about'){
        fairuOkuru(res, 'about.html');
    } else {
        fairuOkuru(res, '404.html', 404);
    }

});
saaba.listen(3000, () => {
    console.log('http://localhost:3000');
});