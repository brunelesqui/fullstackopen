import axios from 'axios'

const API_OWM_KEY = import.meta.env.VITE_OWM_KEY;

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const query = '?q='
const key = '&APPID='

const getWeather = (capital) => { 
  const request = axios.get(baseUrl+query+capital+key+API_OWM_KEY) 
  return request.then(response => response.data) 
}

export default getWeather