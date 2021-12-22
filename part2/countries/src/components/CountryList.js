import React from 'react';

const CountryList = ({ countries, setFilter }) => {
	return (
		<div>
			{countries.map((country) => (
				<div key={country.name.common}>
					{country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button>
				</div>
			))}
		</div>
	);
};

export default CountryList;
