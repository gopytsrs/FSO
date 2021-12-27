const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Person = require('./models/person');

const morgan = require('morgan');
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body'));
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

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

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
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

	person
		.save()
		.then((savedPerson) => res.json(savedPerson))
		.catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	const person = {
		name: body.name,
		number: body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then((updatedPerson) => res.json(updatedPerson))
		.catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndDelete(req.params.id)
		.then(() => res.status(204).end())
		.catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).send({ error: 'Expected name to be unique' });
	}

	next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
