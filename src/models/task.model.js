const pool = require("../config/database");

class TaskModel {
	async findAll() {
		const query = "select * from tasks";
		const [rows] = await pool.query(query);
		return rows;
	}

	async create(taskData) {
		const { title } = taskData;
		const query = "insert into tasks (title) value (?)";

		const [result] = await pool.query(query, [title]);
		const insertedId = result.insertId;
		const [rows] = await pool.query("select * from tasks where id = ?", [insertedId]);

		return rows[0];
	}

	async findOne(id) {
		const query = "select * from tasks where id = ?";
		const [rows] = await pool.query(query, [id]);
		return rows[0];
	}

	async update(id, taskData) {
		const { title } = taskData;
		const query = "update tasks set title = ? WHERE id = ?;";
		await pool.query(query, [title, id]);
		const [rows] = await pool.query("select * from tasks where id = ?", [id]);
		return rows[0];
	}

	async destroy(id) {
		const query = "delete from tasks where id = ?;";
		const [{ affectedRows }] = await pool.query(query, [id]);
		return affectedRows;
	}
}

module.exports = new TaskModel();
