const http = require('http');
const saaba = http.createServer(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (req.method === 'GET' && req.url === '/'){
        res.end('<form action="/result" method="post">' +
        '名前 <input name="namae"><br>'+
        'メール <input name="meeru"><br>'+
        '<button>送信</button></form>');
    } else if (req.method === 'POST' && req.url === '/result'){
        let data = '';
        req.on('data', function(kakera) { data += kakera; });
        req.on('end', function() {
            const atari = new URLSearchParams(data);
            const namae = atari.get('namae');
            const meeru = atari.get('meeru');
            res.end('<h1>名前:' + namae + '</h1>' +
            '<h1>メール:' + meeru + '</h1>');
        });
    }
});
saaba.listen(3000, function(){
    console.log('localhost:3000');
});
