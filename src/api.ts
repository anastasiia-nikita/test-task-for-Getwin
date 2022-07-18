import axios from 'axios';

const TYPE_URL = 'https://pokeapi.co/api/v2/type/';
const COUNT_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPockemonsCount = async () => {
  const response = await axios.get(COUNT_URL);

  return response.data;
};

export const getPockemonsType = async () => {
  const response = await axios.get(TYPE_URL);

  return response.data;
};
