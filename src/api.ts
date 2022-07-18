import axios from 'axios';

// export const getPockemons = async (url:string) => {
//   const response = await axios.get(url);

//   return response.data;
// };

// export const getPockemonsInfo = async (url:string) => {
//   const response = await axios.get(url);

//   return response.data;
// };

export const getPockemonsType = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/type/');

  return response.data;
};
