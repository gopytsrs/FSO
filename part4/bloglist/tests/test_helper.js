const Blog = require('../models/blog');
const initialBlogs = [
	{ title: 'testblog1', author: 'testauthor1', url: 'testurl1', likes: 25 },
	{ title: 'testblog2', author: 'testauthor2', url: 'testurl2', likes: 50 },
];

const blogsInDB = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const getLastBlogWithoutID = (blogs) => {
	const blog = blogs[blogs.length - 1];
	delete blog.id;
	return blog;
};

module.exports = { initialBlogs, blogsInDB, getLastBlogWithoutID };
