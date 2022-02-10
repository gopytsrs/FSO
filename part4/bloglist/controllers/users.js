const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
	const body = request.body;
	if (!body.username || !body.password) {
		response.status(400).json({ error: 'Both username and password must be provided!' });
		return;
	}

	if (body.password.length < 3) {
		response.status(400).json({ error: 'Password needs to be at least 3 characters!' });
		return;
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	});
	try {
		const savedUser = await user.save();
		response.json(savedUser);
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
});

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { likes: 0, user: 0 });
	if (!users.length) {
		response.status(400).json({ error: 'No users were found' });
		return;
	}
	response.status(200).json(users);
});

module.exports = usersRouter;
