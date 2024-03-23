import {useState} from 'react'
import getWeather from './../services/getWeather.js'

const URL_ICON = 'https://openweathermap.org/img/wn'

const Country = ({country}) => { 
	const [weather, setWeather] = useState(null)

	if (country !== null) {
		getWeather(country.capital[0])
			.then(data=>{
				const src = `${URL_ICON}/${data.weather[0].icon}.png`
				let tmp = <div>{data.main.temp} degrees 
					<br/> {data.weather[0].main}, {data.weather[0].description}
					<br/> <img src={src} alt='Icon wheather'/>
					</div>
				setWeather(tmp)
			})

		const languages = []
		for(let lang in country.languages)
			languages.push(<li key={lang}>{country.languages[lang]}</li>)

		return (
			<div>
				<h1>
					{country.name.official}
				</h1>
				Region:{country.region}
				<br/>
				Capital:{country.capital[0]}
				<br/>			
				Population:{country.population} hab.
				<br/>
				Flag:{country.flag}
				<br/>
				Languages:
				<ul>
					{languages}
				</ul>
				<h2>
					Weather in {country.capital[0]}
				</h2>
				{weather}
			</div>
		)
	} else {
		return(
			<>				
			</>
		)
	}
}

export default Country