import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

function App() {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		if (!filter) {
			return;
		}
		const filteredCountries = countries
			.filter((country) => country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
			.sort((a, b) => a.name.common.localeCompare(b.name.common));
		setFilteredCountries(filteredCountries);
	}, [filter, countries]);

	useEffect(() => {
		//IIFE
		(async () => {
			try {
				const response = await axios.get('https://restcountries.com/v3.1/all');
				const data = await response.data;
				setCountries(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	return (
		<div className='App'>
			<h1>Countries</h1>
			<Filter countries={countries} setFilter={setFilter} />
			<Countries countries={filteredCountries} setFilter={setFilter} />
		</div>
	);
}

export default App;
