const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	if (!request.body.title || !request.body.url) {
		response.status(400).json({ error: 'Missing fields from blog! Please include all fields' });
		return;
	}
	if (!request.body.likes) {
		request.body.likes = 0;
	}

	const blog = new Blog(request.body);
	const result = await blog.save();

	return response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = {
		likes: request.body.likes,
	};
	const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
	return response.status(204).json(result);
});

module.exports = blogsRouter;
