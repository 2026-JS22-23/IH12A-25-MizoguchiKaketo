const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTaipu = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.js': 'text/javascript; charset=utf-8'
};

const saaba = http.createServer(function(req, res) {
    let filepath = path.join(__dirname, 'index.html');
    if (req.url !== '/') {
        filepath = path.join(__dirname, req.url);
    }
    const kakutyoushi = path.extname(filepath);
    const shurui = mimeTaipu[kakutyoushi] || 'application/octet-stream';
    fs.readFile(filepath, function(err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not Found');
            return;
        }
        res.writeHead(200, { 'Content-Type': shurui });
        res.end(data);
    });
});

saaba.listen(3000, function() {
    console.log('http://localhost:3000');
});