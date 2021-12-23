import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	const data = await response.data;

	return data;
};

const create = async (newPerson) => {
	const response = await axios.post(baseUrl, newPerson);
	const data = await response.data;

	return data;
};

const deletePerson = async (id) => {
	const response = await axios.delete(`${baseUrl}/${id}`);
	const data = await response.data;

	return data;
};

const update = async (id, updatedPerson) => {
	const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
	const data = await response.data;

	return data;
};

const personsService = { getAll, create, deletePerson, update };

export default personsService;
