const mysql = require('mysql2');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '1234qwer',
	database: 'FORUM'
});

const promisePool = pool.promise();

const object = {

	async addTopic (data) {
		const sql = "insert into topic(title, article, board_id) values(?, ?, ?)";
		const [rows, fields] = await promisePool.query(sql, data);
	},

	async listAllTopic () {
		const sql = "select * from topic order by id desc";
		const [rows, fields] = await promisePool.query(sql);
		return rows;
	},

	async listTopicByBoardId (data) {
		const sql = "select * from topic where board_id=? order by id desc";
		const [rows, fields] = await promisePool.query(sql, data);
		return rows;
	}

};

module.exports = object;




