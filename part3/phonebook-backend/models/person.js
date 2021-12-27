const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const DATABASE_URI = process.env.DATABASE_URI;

console.log('connecting to MongoDB: ', DATABASE_URI);

mongoose
	.connect(DATABASE_URI)
	.then(() => console.log('Connected to MongoDb'))
	.catch((err) => console.log(`Error connecting to MongoDB: ${err.message}`));

const personSchema = mongoose.Schema({
	name: { type: String, minLength: 3, required: true, unique: true },
	number: { type: String, minLength: 8, required: true, unique: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
