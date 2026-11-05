const mysql = require('mysql2');

const setuzoku = mysql.createConnection({
    host: 'localhost',// 	MySQLが動いている場所
    user: 'root',// 	MySQLにログインするユーザー名
    password: 'root',// 	そのユーザーのパスワード
    database: 'myapp_db',// 	MySQLのデータベース名
    charset: 'utf8mb4',// 	MySQLの文字コード
});

setuzoku.connect(function(err) {
    if (err) {
        console.error('MySQL接続エラー:', err);
        return;
    }
    console.log('MySQL接続成功');
});

module.exports = setuzoku;