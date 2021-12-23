import React from 'react';

const Persons = ({ persons, deletePerson }) => {
	return (
		<div>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<div key={person.id}>
					{person.name} {person.number} <button onClick={deletePerson(person.id)}>delete</button>
				</div>
			))}
		</div>
	);
};

export default Persons;
