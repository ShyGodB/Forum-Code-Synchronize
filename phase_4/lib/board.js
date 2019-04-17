const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234qwer',
    database: 'FORUM'
});

const promisePool = pool.promise();

const object = {

    async addBoard (boardName) {
        const sql = "insert into boards(board_name) values(?)";
        const [rows, fields] = await promisePool.query(sql, boardName);
        return rows;
    },

    async listBoardAll () {
        const sql = "select * from boards where useful=1";
        const [rows, fields] = await promisePool.query(sql);
        return rows;
    },

};

module.exports = object;