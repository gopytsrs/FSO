import React, { useState } from 'react';

const PersonForm = ({ setPersons, persons }) => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const checkPersonNameExists = (name) => persons.find((person) => person.name === name);

	const checkPersonNumberExists = (number) => persons.find((person) => person.number === number);

	const clearInputs = () => document.querySelector('form').reset();

	const createNewPerson = (e) => {
		e.preventDefault();

		if (checkPersonNameExists(newName)) {
			alert(`${newName} is already added to the phonebook`);
			return;
		}

		if (checkPersonNumberExists(newNumber)) {
			alert(`${newNumber} is already added to the phonebook`);
			return;
		}

		const person = { name: newName, number: newNumber, id: persons.length + 1 };
		setPersons([...persons, person]);
		clearInputs();
		setNewName('');
	};

	return (
		<form onSubmit={createNewPerson}>
			<h2>Add a new:</h2>
			<div>
				name: <input onChange={(e) => setNewName(e.target.value)} required />
			</div>
			<div>
				number: <input onChange={(e) => setNewNumber(e.target.value)} required />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
