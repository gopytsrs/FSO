const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv').config();

const Note = require('./models/note');

app.use(express.static('build'));
app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
	console.log('Method:', request.method);
	console.log('Path:  ', request.path);
	console.log('Body:  ', request.body);
	console.log('---');
	next();
};

app.use(requestLogger);

app.get('/', (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

app.get('/api/notes', (req, res) => {
	Note.find({}).then((notes) => res.json(notes));
});

app.get('/api/notes/:id', (req, res) => {
	Note.findById(req.params.id).then((note) => res.json(note));
});

app.delete('/api/notes/:id', (req, res) => {
	Note.deleteOne({ id: req.params.id }).then((note) => res.json(note));
});

app.post('/api/notes', (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({
			error: 'content missing',
		});
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	});

	note.save().then((savedNote) => res.json(savedNote));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
