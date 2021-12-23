import React, { useState } from 'react';
import personsService from './services/persons';

const PersonForm = ({ setPersons, persons, setMessage }) => {
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const checkPersonNameExists = (name) => persons.find((person) => person.name === name);

	const checkPersonNumberExists = (number) => persons.find((person) => person.number === number);

	const clearInputs = () => document.querySelector('form').reset();

	const createNewPerson = async (e) => {
		e.preventDefault();

		if (checkPersonNameExists(newName)) {
			const replaceNumber = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);

			if (!replaceNumber) {
				return;
			}
			const person = persons.find((person) => person.name === newName);
			personsService
				.update(person.id, { ...person, number: newNumber })
				.then((updatedPerson) => {
					setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)));
					setMessage(`Update phone number of ${newName}`, 'success');
				})
				.catch((err) => {
					console.log(err);
					setMessage(`Failed to update the number of ${newName}`, 'error');
				});
			return;
		}

		if (checkPersonNumberExists(newNumber)) {
			setMessage(`${newNumber} is already added to the phonebook`);
			return;
		}

		personsService
			.create({ name: newName, number: newNumber })
			.then((person) => {
				setPersons([...persons, person]);
				setMessage(`Added ${newName} to the phonebook`, 'success');
				clearInputs();
				setNewName('');
			})
			.catch((err) => {
				console.log(err);
				setMessage(`Failed to add ${newName} to the phonebook`, 'error');
			});
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
