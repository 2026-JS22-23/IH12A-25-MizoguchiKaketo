const setuzoku = require('./db');

const sql = 'SELECT * FROM users ORDER BY id';
setuzoku.query(sql, function(err, results) {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log(results);
});