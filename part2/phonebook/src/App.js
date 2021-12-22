import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [predicate, setPredicate] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const data = await (await axios.get('http://localhost:3001/persons')).data;
			setPersons(data);
		};
		fetchData();
	}, []);

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
