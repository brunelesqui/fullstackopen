import { useState, useEffect } from 'react'
import FindCountry from './components/FindCountry.jsx'
import List from './components/List.jsx'
import Country from './components/Country.jsx'
import countriesServices from './services/countries.js'

function App() {
  const [countryName, setCountryName] = useState('')
  const [countries, setCountries] = useState(null)
  const [countriesFilter, setContriesFilter] = useState([])
  const [message, setMessage] = useState('')
  const [countrySel, setCountrySel] = useState(null)

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value)
    setCountrySel(null)
  }

  const handleShowButton = (index) => {
    setCountrySel(countriesFilter[index])
  }

  const LIMIT = 10;

  const hook = () => {
    if (countries === null) {
      countriesServices
        .getCountries()
        .then(response => {
          setCountries(response)
          console.log('hook Response OK')
        })

    } else {
      const countriesQuery = countries.filter(country=>country.name.common.toLowerCase().includes(countryName.toLowerCase()))
      setMessage('')
      if (countriesQuery.length > LIMIT) {
        setMessage('Too many matches, specify another filter')
        setContriesFilter([])
      } else {
        setContriesFilter(countriesQuery)
      }
    }
  }

  useEffect(
    hook, [countryName]
  )

  return (
    <>
      <FindCountry 
        submit={null}
        countryName={countryName}
        handleCountryNameChange={handleCountryNameChange}
      />
      <div>
        {message}
        <List 
          list={countriesFilter}
          handleClickShowButton={handleShowButton}
        />
        <Country 
          country={countrySel}
        />
      </div>
    </>
  )
}

export default App
