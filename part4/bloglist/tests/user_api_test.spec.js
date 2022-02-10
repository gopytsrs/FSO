const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);

describe('when there is initially one user in the db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const passwordHash = await bcrypt.hash('secret', 10);
		const user = new User({ username: 'root', passwordHash });

		await user.save();
	});

	it('creates a fresh username', async () => {
		const usersAtStart = await helper.usersInDB();

		const newUser = {
			username: 'seangoats',
			name: 'Sean Goh',
			password: 'password',
		};

		await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', 'application/json; charset=utf-8');

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	it('should fail if username is taken', async () => {
		const usersAtStart = await helper.usersInDB();

		const newUser = { username: 'root', password: 'password', name: 'shouldfail' };

		const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', 'application/json; charset=utf-8');

		expect(result.body.error).toContain('`username` to be unique');

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	it('should fail if username less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDB();

		const newUser = { username: '12', password: 'password', name: 'shouldfail' };

		const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', 'application/json; charset=utf-8');

		expect(result.body.error).toContain('`username` (`12`) is shorter than the minimum allowed length (3).');

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	it('should fail if password less than 3 characters', async () => {
		const usersAtStart = await helper.usersInDB();

		const newUser = { username: 'username', password: 'pa', name: 'shouldfail' };

		const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', 'application/json; charset=utf-8');

		expect(result.body.error).toBe('Password needs to be at least 3 characters!');

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	it('should fail if either username or password not given', async () => {
		const usersAtStart = await helper.usersInDB();

		const newUser = { name: 'shouldfail' };

		const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', 'application/json; charset=utf-8');

		expect(result.body.error).toBe('Both username and password must be provided!');

		const usersAtEnd = await helper.usersInDB();
		expect(usersAtEnd).toHaveLength(usersAtStart.length);
	});

	afterAll(() => {
		mongoose.connection.close();
	});
});
