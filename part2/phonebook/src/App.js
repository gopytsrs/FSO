import React, { useState } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);

	const [predicate, setPredicate] = useState('');

	const getFilteredPersons = () =>
		predicate ? persons.filter((person) => person.name.toLocaleLowerCase().includes(predicate.toLocaleLowerCase())) : persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter setPredicate={setPredicate} />
			<PersonForm persons={persons} setPersons={setPersons} />
			<Persons persons={getFilteredPersons()} />
		</div>
	);
};

export default App;
