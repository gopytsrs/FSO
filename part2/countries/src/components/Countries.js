import React from 'react';
import CountryList from './CountryList';
import CountryView from './CountryView';

const Countries = ({ countries, setFilter }) => {
	return (
		<>
			{countries.length === 0 && <div>Type a search term to search for countries</div>}
			{countries.length > 10 && <div>Too many matches, specify another filter</div>}
			{countries.length > 1 && countries.length <= 10 && <CountryList countries={countries} setFilter={setFilter} />}
			{countries.length === 1 && <CountryView country={countries[0]} />}
		</>
	);
};

export default Countries;
