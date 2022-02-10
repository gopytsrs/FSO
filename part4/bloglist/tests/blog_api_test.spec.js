const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});
	for (const blog of helper.initialBlogs) {
		const blogObject = new Blog(blog);
		await blogObject.save();
	}
});

it('should return blogs as json', async () => {
	await api.get('/api/blogs').expect(200).expect('Content-Type', 'application/json; charset=utf-8');
});

it('should return the all the blogs', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

it('should have id property on the blog', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body[0].id).toBeDefined();
});

it('should create a new blog', async () => {
	const blogToCreate = { title: 'testblog3', author: 'testauthor3', url: 'testurl3', likes: 75 };
	await api.post('/api/blogs').send(blogToCreate).expect(201);

	const allBlogs = await helper.blogsInDB();
	expect(allBlogs.length).toBe(helper.initialBlogs.length + 1);
	const blogSaved = helper.getLastBlogWithoutID(allBlogs);
	expect(blogSaved).toEqual(blogToCreate);
});

it('should default create a new blogs with likes=0 if no likes provided', async () => {
	const blogToCreate = { title: 'testblogslikes', author: 'testbloglikes', url: 'testurl4' };
	await api.post('/api/blogs').send(blogToCreate).expect(201);

	const allBlogs = await helper.blogsInDB();
	expect(allBlogs.length).toBe(helper.initialBlogs.length + 1);
	const blogSaved = helper.getLastBlogWithoutID(allBlogs);
	expect(blogSaved).toEqual({ ...blogToCreate, likes: 0 });
});

it('should response with status code 400 if title and url are missing', async () => {
	const blogToCreate = { author: 'testtitleurlmissing' };
	await api.post('/api/blogs').send(blogToCreate).expect(400);

	const allBlogs = await helper.blogsInDB();
	expect(allBlogs).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
	mongoose.connection.close();
});
