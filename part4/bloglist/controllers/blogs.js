const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', (request, response) => {
	if (!request.body.title || !request.body.url) {
		response.status(400).json({ error: 'Missing fields from blog! Please include all fields' });
		return;
	}
	if (!request.body.likes) {
		request.body.likes = 0;
	}

	const blog = new Blog(request.body);

	blog.save().then((result) => {
		response.status(201).json(result);
	});
});

module.exports = blogsRouter;
