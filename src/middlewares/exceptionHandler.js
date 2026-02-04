const exceptionHandler = (err, req, res, _) => {
	return res.error(500, err.message, err);
};

module.exports = exceptionHandler;
