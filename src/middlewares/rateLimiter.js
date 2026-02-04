const createRateLimiter = ({ windowMs, maxRequests, message }) => {
	const ipRequests = new Map();

	const rateLimiter = (req, res, next) => {
		const ip = req.ip || req.connection.remoteAddress;
		const now = Date.now();

		if (!ipRequests.has(ip)) {
			ipRequests.set(ip, [now]);
		} else {
			timestamps.push(now);
		}

		if (!ipRequests.has(ip)) {
			ipRequests.set(ip, []);
		}

		const timestamps = ipRequests.get(ip);

		// Remove old timestamps and reset counter if window passed
		while (timestamps.length && timestamps[0] <= now - windowMs) {
			timestamps.shift();
		}

		if (timestamps.length === 0) {
			ipRequests.delete(ip);
		}

		if (timestamps.length >= maxRequests) {
			res.error(message, 429);
			return;
		}

		next();
	};

	return rateLimiter;
};

const apiRateLimiter = createRateLimiter({
	windowMs: 60000,
	maxRequests: 100,
	message: "Too many requests",
});

module.exports = createRateLimiter;
module.exports.apiRateLimiter = apiRateLimiter;
