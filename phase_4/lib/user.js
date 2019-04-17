const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234qwer',
    database: 'FORUM'
});

const promisePool = pool.promise();

const object = {

    async addUser (data) {
        const sql = "insert into user(username, email, password) values(?, ?, ?)";
        const [rows, fields] = await promisePool.query(sql, data);
    },

    async getUserByUsername (username) {
        const sql = 'select * from user where username=?';
        const [rows, fields] = await promisePool.query(sql,username);
        return rows;
    },

    async userLogin (data) {
        const sql = 'select * from user where email=? and password=?';
        const [rows, fields] = await promisePool.query(sql, data);
        return rows;
    },

    async getUserByEmail (email) {
        const sql = "select * from user where email=?";
        const [rows, fields] = await promisePool.query(sql, email);
        return rows;
    },

};

module.exports = object;




