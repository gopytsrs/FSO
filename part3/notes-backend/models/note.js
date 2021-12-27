const mongoose = require('mongoose');

const url = process.env.DATABASE_URI;

console.log('connecting to ', url);

mongoose
	.connect(url)
	.then((res) => console.log('connected to MongoDB'))
	.catch((err) => {
		console.log('An error occured connecting to MongoDB:', err.message);
	});

const noteSchema = mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Note', noteSchema);
