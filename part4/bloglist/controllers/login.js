const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const { SECRET } = require('../utils/config');

loginRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = await User.findOne({ username: body.username });
	const passwordCorrect = !user ? false : await bcrypt.compare(body.password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		response.status(401).json({
			error: 'invalid username or password',
		});
		return;
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, SECRET);

	response.status(200).send({
		token,
		username: user.username,
		name: user.name,
	});
});

module.exports = loginRouter;
