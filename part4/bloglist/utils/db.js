const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('../utils/config');

const connect = () => {
	mongoose
		.connect(config.DB_URI)
		.then(() => logger.info('Connected to MongoDB'))
		.catch((err) => logger.error(err));
};

module.exports = { connect };
