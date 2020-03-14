import axios from 'axios';

const swapi = axios.create({
  baseURL: 'https://swapi.co/api/',
});

export default swapi;
