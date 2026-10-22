const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Hello World</h1>');
});

server.listen(3000, () => {
    console.log('Server起動: http://localhost:3000');
});