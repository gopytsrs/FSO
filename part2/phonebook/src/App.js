import React, { useState, useEffect } from 'react';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Filter from './Filter';
import Notification from './Notification';
import personsService from './services/persons';
import './index.css';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [predicate, setPredicate] = useState('');
	const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

	useEffect(() => {
		personsService
			.getAll()
			.then((persons) => setPersons(persons))
			.catch((err) => console.log(err));
	}, []);

	const getFilteredPersons = () =>
		predicate ? persons.filter((person) => person.name.toLocaleLowerCase().includes(predicate.toLocaleLowerCase())) : persons;

	const deletePerson = (id) => () => {
		const name = persons.find((person) => person.id === id).name;

		personsService
			.deletePerson(id)
			.then((person) => {
				setPersons(persons.filter((person) => person.id !== id));
				setMessage(`Deleted ${name} from the phonebook`, 'success');
			})
			.catch((err) => {
				console.log(err);
				setMessage(`${name} is already deleted from the phonebook`, 'error');
			});
	};

	const setMessage = (message, type) => {
		setNotification({ show: true, message, type });

		if (type === 'success') {
			setTimeout(() => setNotification({ ...notification, show: false }), 3000);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			{notification.show && <Notification message={notification.message} notificationType={notification.type} />}
			<Filter setPredicate={setPredicate} />
			<PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
			<Persons persons={getFilteredPersons()} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
