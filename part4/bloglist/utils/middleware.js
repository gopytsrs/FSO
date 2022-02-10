const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const logger = require('./logger');

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	}
	next();
};

const userExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, SECRET);
	if (!decodedToken.id) {
		response.status(401).json({ error: 'missing or invalid token' });
		return;
	}

	request.user = await User.findById(decodedToken.id);
	next();
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token',
		});
	}

	next(error);
};

module.exports = { tokenExtractor, userExtractor, errorHandler };
