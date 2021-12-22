import React from 'react';

const Weather = ({ weatherData }) => {
	return (
		<>
			{weatherData && (
				<div>
					<strong>Currently: </strong>
					{weatherData.weather.map((weather) => (
						<p key={weather.id}>
							{weather.main}, {weather.description}
						</p>
					))}
					<p>
						<strong>Temperature: </strong>
						{(((weatherData.main.temp - 32) * 5) / 9).toFixed(2)}°C
					</p>
					<p>
						<strong>Feels like: </strong>
						{(((weatherData.main.feels_like - 32) * 5) / 9).toFixed(2)}°C
					</p>
					<p>
						<strong>Wind speed</strong>: {weatherData.wind.speed}mph, {weatherData.wind.deg}°
					</p>
				</div>
			)}
		</>
	);
};

export default Weather;
