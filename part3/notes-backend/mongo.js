const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://seangoats:${password}@cluster0.c4kho.mongodb.net/notes-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
// 	content: 'JS is fine',
// 	date: new Date(),
// 	important: true,
// });

// note.save().then((result) => {
// 	console.log('note saved!');
// 	mongoose.connection.close();
// });

Note.find({ important: false }).then((result) => {
	result.forEach((note) => {
		console.log(note);
	});
	mongoose.connection.close();
});