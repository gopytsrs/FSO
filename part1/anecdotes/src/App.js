import React, { useState, useEffect } from 'react';

const Title = ({ title }) => <h1>{title}</h1>;

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
	];

	const [selected, setSelected] = useState(0);
	const [mostVotes, setMostVotes] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

	useEffect(() => {
		let maxIndex = 0;
		let max = points[maxIndex];
		for (let i = 1; i < points.length; i++) {
			if (points[i] > max) {
				maxIndex = i;
				max = points[i];
			}
		}

		setMostVotes(maxIndex);
	}, [points]);

	const showNextAnecdote = () => {
		const index = Math.floor(Math.random() * anecdotes.length);
		setSelected(index);
	};

	const voteForCurrentAnecdote = () => {
		const copy = [...points];
		copy[selected]++;

		setPoints(copy);
	};

	return (
		<>
			<Title title='Anecdote of the day' />
			<div>
				<p>{anecdotes[selected]}</p>
				<p>has {points[selected]} votes</p>
			</div>
			<Button text='vote' handleClick={voteForCurrentAnecdote} />
			<Button text='next anecdote' handleClick={showNextAnecdote} />
			<Title title='Anecdote with the most votes' />
			<div>
				<p>{anecdotes[mostVotes]}</p>
				<p>has {points[mostVotes]} votes</p>
			</div>
		</>
	);
};

export default App;
