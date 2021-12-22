import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Weather from './Weather';

const CountryView = ({ country }) => {
	const [weatherData, setWeatherData] = useState(undefined);

	useEffect(() => {
		//IIFE
		(async () => {
			try {
				const [lat, lon] = country.capitalInfo.latlng;
				const response = await axios.get(
					`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
				);
				const data = await response.data;
				setWeatherData(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [country]);
	return (
		<div>
			<h3>{country.name.common}</h3>
			<p>capital: {country.capital}</p>
			<p>population: {country.population}</p>
			<h4>languages:</h4>
			<ul>
				{Object.values(country.languages).map((language) => (
					<li key={language}>{language}</li>
				))}
			</ul>
			<img src={country.flags.png} alt='country flag' />
			<div>
				<h3>Weather in {country.capital}</h3>
				<Weather weatherData={weatherData} />
			</div>
		</div>
	);
};

export default CountryView;
