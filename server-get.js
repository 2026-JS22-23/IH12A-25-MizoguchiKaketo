const http = require('http');


const saaba = http.createServer(function(req, res){
    const yuuaaru = new URL(req.url, 'http://localhost:3000');
    const kensaku = yuuaaru.searchParams.get('kensaku');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (yuuaaru.pathname === '/'){
        res.end('<form action="/search" method="get">' +
            '<input name="kensaku">'+
            '<button>検索</button></form>');
        } else {
            res.end('<h1>検索ワード:'+kensaku+'</h1>');
        }
});
saaba.listen(3000, function(){
    console.log('localhost:3000');
});