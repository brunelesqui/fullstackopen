import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const endpointAll = 'api/all'
const endpointCountry = 'api/name/'

const getCountries = () => get(`${baseUrl}${endpointAll}`)

const getCountry = (name) => get(`${baseUrl}${endpointCountry}/${name}`) 

const get = (url) => { 
  const request = axios.get(url) 
  return request.then(response => response.data) 
}

// Definición compacta:
export default { getCountries, getCountry }