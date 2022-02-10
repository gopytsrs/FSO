const Blog = require('../models/blog');
const User = require('../models/user');

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

const usersInDB = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, blogsInDB, getLastBlogWithoutID, usersInDB };
