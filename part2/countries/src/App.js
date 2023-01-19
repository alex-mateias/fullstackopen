import { useState, useEffect } from 'react'
import axios from 'axios'

const CountriesDisplay = ({ countries, setNewFilter, api_key, link }) => {

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countries.length < 10 && countries.length > 1) {
    return countries.map(country => {
      return (
        <div key={country.name.official}>
          {country.name.official} <button value={country.name.official} onClick={(event) => { setNewFilter(event.target.value) }}>show</button>
        </div>
      )
    })
  }
  else if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages
    const link = 'https://api.weatherapi.com/v1/current.json?key=' + api_key + '&q=' + country.name.common + '&aqi=no'
    console.log(link)
    return (
      <div>
        <h1>{country.name.official}</h1>
        <h3>capital {country.capital}</h3>
        <h3>area {country.area}</h3>
        <h1>languages:</h1>
        <ul>
          {Object.keys(languages).map((key, index) => <li key={index}>{languages[key]}</li>)}
        </ul>
        <img src={country.flags.svg} alt={country.name} width='25%' />
        <WeatherDisplay country={country} />
      </div>
    )
  }
  else {
    return (
      <p>nothing to show</p>
    )
  }
}

const WeatherDisplay = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.name.common}&aqi=no`)
      .then(response => {
        setWeatherData(response.data)
      })
  }, [country])

  return(
    <div>
      <h1>Weather in {weatherData.location?.name}</h1>
      <img src={weatherData.current?.condition.icon} alt={weatherData.location?.name} width='10%' />
      <div>temperature {weatherData.current?.temp_c}°C</div>
      <div>wind {weatherData.current?.wind_kph}km/h</div>
    </div>
  )

}

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const filteredCountries = (countries.filter(country => country.name.official.toLowerCase().includes(newFilter.toLowerCase(), 0)))



  return (
    <div>
      <div>
        find countries <input
          value={newFilter}
          onChange={(event) => { setNewFilter(event.target.value) }}
        />

      </div>
      <CountriesDisplay countries={filteredCountries} setNewFilter={setNewFilter} />
    </div>
  );
}

export default App;
