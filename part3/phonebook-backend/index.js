const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const Person = require('./models/person');

const morgan = require('morgan');
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

// let persons = [
// 	{
// 		id: 1,
// 		name: 'Arto Hellas',
// 		number: '040-123456',
// 	},
// 	{
// 		id: 2,
// 		name: 'Ada Lovelace',
// 		number: '39-44-5323523',
// 	},
// 	{
// 		id: 3,
// 		name: 'Dan Abramov',
// 		number: '12-43-234345',
// 	},
// 	{
// 		id: 4,
// 		name: 'Mary Poppendieck',
// 		number: '39-23-6423122',
// 	},
// ];

app.get('/', (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

app.get('/info', async (req, res) => {
	const persons = await Person.find({});
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
	Person.find({}).then((persons) => res.json(persons));
});

app.get('/api/persons/:id', (req, res) => {
	Person.findById(req.params.id).then((person) => res.json(person));
});

// const generateId = () => Math.random() * 500;

// const checkPersonExists = (name) => persons.find((person) => person.name === name);

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.number) {
		return res.status(400).json({
			error: 'number missing',
		});
	}

	if (!body.name) {
		return res.status(400).json({
			error: 'name missing',
		});
	}

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person.save().then((savedPerson) => res.json(savedPerson));
});

app.delete('/api/persons/:id', (req, res) => {
	Person.deleteOne({ id: req.params.id }).then((person) => res.json(person));
	res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
