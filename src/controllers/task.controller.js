const taskModel = require("../models/task.model");

const findAll = async (req, res) => {
	const result = await taskModel.findAll();
	res.success(result);
};

const findOne = async (req, res) => {
	const taskId = +req.params.id;
	const result = await taskModel.findOne(taskId);
	res.success(result);
};

const create = async (req, res) => {
	const { title } = req.body;
	const result = await taskModel.create({ title });
	res.success(result, 201);
};

const update = async (req, res) => {
	const taskId = +req.params.id;
	const taskData = req.body;

	const result = await taskModel.update(taskId, taskData);

	res.success(
		{
			message: "Cập nhật thành công",
			task: result,
		},
		201,
	);
};

const deleteTask = async (req, res) => {
	const taskId = +req.params.id;

	if (!taskId) {
		return res.error(
			{
				message: "ID task không hợp lệ",
				deleted: false,
			},
			400,
		);
	}

	const affectedRows = await taskModel.destroy(taskId);

	if (!affectedRows) {
		return res.error(
			{
				message: "Không tìm thấy task",
				deleted: false,
			},
			404,
		);
	}

	res.success(
		{
			message: "Xóa thành công",
			deleted: true,
		},
		200,
	);
};

module.exports = { findAll, findOne, create, update, deleteTask };
