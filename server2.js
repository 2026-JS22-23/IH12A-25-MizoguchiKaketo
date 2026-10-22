const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('ファイルが見つかりません');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

server.listen(8080, () => {
    console.log('Server起動: http://localhost:8080');
});

// リクエストが来るたびにconsole.log(req.url)を表示
server.on('request', (req, res) => {
    console.log(req.url);
});