const pool = require("../config/database");

class TaskModel {
	async findAll() {
		const query = "select * from tasks";
		const [rows] = await pool.query(query);
		return rows;
	}

	async create(taskData) {
		const { title, content } = taskData;

		const query = "insert into tasks (title, content) value (?, ?)";
		const [rows] = await pool.query(query, [title, content]);
		return rows[0];
	}

	async findOne(id) {
		const query = "select * from tasks where id = ?";
		const [rows] = await pool.query(query, [id]);
		return rows[0];
	}

	async update(id, taskData) {
		const query = "update tasks set title = ? WHERE id = ?;";
		const [rows] = await pool.query(query, [taskData, id]);
		return rows;
	}

	async destroy(id) {
		const query = "delete from posts where id = ?;";
		const [rows] = await pool.query(query, [id]);
		return rows;
	}
}

module.exports = new TaskModel();
