import React from 'react';

const Filter = ({ setPredicate }) => {
	return (
		<div>
			filter shown with: <input onChange={(e) => setPredicate(e.target.value)} />
		</div>
	);
};

export default Filter;
