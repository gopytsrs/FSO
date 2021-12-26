const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

if (process.argv.length > 5) {
	console.log('Provide the command in the form: node mongo.js <password> <name> <number>');
	process.exit(1);
}

if (process.argv.length === 4) {
	console.log('Please provide both the name and number to create a person: node mongo.js <password> <name> <number>');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://seangoats:${password}@cluster0.c4kho.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

const getAllPersons = () => {
	Person.find({}).then((result) => {
		console.log('phonebook:');
		result.forEach((person) => {
			console.log(person);
		});
		mongoose.connection.close();
	});
};

const createPerson = (name, number) => {
	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log(`Saved a new person:`);
		console.log(result);
		mongoose.connection.close();
	});
};

if (process.argv.length === 3) {
	getAllPersons();
}

if (process.argv.length === 5) {
	const name = process.argv[3];
	const number = process.argv[4];
	createPerson(name, number);
}
