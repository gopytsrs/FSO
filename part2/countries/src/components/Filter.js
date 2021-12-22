import React from 'react';

const Filter = ({ setFilter }) => {
	return (
		<div>
			find countries: <input onChange={(e) => setFilter(e.target.value)} />
		</div>
	);
};

export default Filter;
