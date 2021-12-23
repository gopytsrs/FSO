const express = require('express');
const app = express();

const morgan = require('morgan');
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));

app.use(express.json());

let persons = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-5323523',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
	},
];

app.get('/', (req, res) => {
	res.send(`<h1>Hello World</h1>`);
});

app.get('/info', (req, res) => {
	res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get('/api/persons', (req, res) => {
	res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
	const person = persons.find((person) => person.id === +req.params.id);

	if (!person) {
		return res.status(404).end();
	}

	res.json(person);
});

const generateId = () => Math.random() * 500;

const checkPersonExists = (name) => persons.find((person) => person.name === name);

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

	if (checkPersonExists(body.name)) {
		return res.status(400).json({
			error: 'name must be unique',
		});
	}

	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	};

	persons = [...persons, person];

	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = +req.params.id;

	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
