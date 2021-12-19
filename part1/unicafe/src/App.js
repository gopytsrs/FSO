import React, { useState } from 'react';

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
);

const Statistics = ({ good, neutral, bad }) => {
	if (good + neutral + bad === 0) {
		return (
			<>
				<Title title='statistics' />
				<p>No feedback given</p>
			</>
		);
	}

	const getTotalFeedback = () => good + neutral + bad;

	const getAverageScore = () => {
		const total = getTotalFeedback();
		if (total === 0) {
			return 0;
		}

		return (good * 1 + bad * -1) / total;
	};

	const getPositiveRatio = () => {
		const total = getTotalFeedback();
		if (total === 0) {
			return `0 %`;
		}

		return `${(good / getTotalFeedback()) * 100} %`;
	};
	return (
		<>
			<Title title='statistics' />
			<table>
				<tbody>
					<StatisticLine text='good' value={good} />
					<StatisticLine text='neutral' value={neutral} />
					<StatisticLine text='bad' value={bad} />
					<StatisticLine text='total' value={getTotalFeedback()} />
					<StatisticLine text='average' value={getAverageScore()} />
					<StatisticLine text='postive' value={getPositiveRatio()} />
				</tbody>
			</table>
		</>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Title title='give feedback' />
			<Button text='good' handleClick={() => setGood(good + 1)} />
			<Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
			<Button text='bad' handleClick={() => setBad(bad + 1)} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
