import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import personsService from './services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [predicate, setPredicate] = useState('');

	useEffect(() => {
		personsService
			.getAll()
			.then((persons) => setPersons(persons))
			.catch((err) => console.log(err));
	}, []);

	const getFilteredPersons = () =>
		predicate ? persons.filter((person) => person.name.toLocaleLowerCase().includes(predicate.toLocaleLowerCase())) : persons;

	const deletePerson = (id) => () => {
		personsService
			.deletePerson(id)
			.then((person) => {
				setPersons(persons.filter((person) => person.id !== id));
			})
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter setPredicate={setPredicate} />
			<PersonForm persons={persons} setPersons={setPersons} />
			<Persons persons={getFilteredPersons()} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
