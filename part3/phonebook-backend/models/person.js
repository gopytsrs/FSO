const mongoose = require('mongoose');

const DATABASE_URI = process.env.DATABASE_URI;

console.log('connecting to MongoDB: ', DATABASE_URI);

mongoose
	.connect(DATABASE_URI)
	.then((result) => console.log('Connected to MongoDb'))
	.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

const personSchema = mongoose.Schema({
	name: String,
	number: String,
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
