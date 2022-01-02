const dummy = (blogs) => {
	console.log(blogs);
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
	let maxBlog = blogs.length && blogs[0];
	for (const blog of blogs) {
		if (blog.likes > maxBlog.likes) {
			maxBlog = blog;
		}
	}
	return maxBlog;
};

const mostBlogs = (blogs) => {
	const blogCount = blogs.reduce((authors, blog) => {
		if (authors[blog.author]) {
			authors[blog.author]++;
		} else {
			authors[blog.author] = 1;
		}

		return authors;
	}, {});

	let authorWithMostBlogs = { count: 0 };

	for (const author of Object.keys(blogCount)) {
		if (blogCount[author] > authorWithMostBlogs.count) {
			authorWithMostBlogs = { author, count: blogCount[author] };
		}
	}

	return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
	const likeCount = blogs.reduce((authors, blog) => {
		if (authors[blog.author]) {
			authors[blog.author] += blog.likes;
		} else {
			authors[blog.author] = blog.likes;
		}

		return authors;
	}, {});

	let authorWithMostLikes = { likes: 0 };

	for (const author of Object.keys(likeCount)) {
		if (likeCount[author] > authorWithMostLikes.likes) {
			authorWithMostLikes = { author, likes: likeCount[author] };
		}
	}

	return authorWithMostLikes;
};

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
};
