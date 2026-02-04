const notFoundHandler = (req, res) => {
	return res.error(
		res.error(
			{
				message: `Cannot ${req.method} ${req.url}`,
			},
			404,
		),
	);
};

module.exports = notFoundHandler;
