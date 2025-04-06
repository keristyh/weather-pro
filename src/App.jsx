import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import WeatherInfo from './Components/WeatherInfo';

function App() {
  const [forecast, setForecast] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [units, setUnits] = useState("I");
  const [CurrentTemp, setCurrentTemp] = useState(0);

  const avgTemp = forecast ? (Object.values(forecast).reduce((sum, weatherData) =>
    sum + weatherData.temp, 0) / Object.keys(forecast).length).toFixed(1) : 0;

  const temps = forecast ? Object.values(forecast).map(data => data.temp) : [];
  const minTempNum = temps.length > 0 ? Math.floor(Math.min(...temps)) : 0;
  const maxtempNum = temps.length > 0 ? Math.ceil(Math.max(...temps)) : 100;

  const searchItems = async (searchValue) => {
    setSearchInput(searchValue);

    if (searchValue !== "") {
      const lower = searchValue.toLowerCase();
      const filteredData = Object.entries(forecast).filter(([city]) =>
        city.toLowerCase().includes(lower));

      if (filteredData.length > 0) {
        setFilteredResults(filteredData);
      }
      else {
        try {
          const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${searchValue}&units=I&key=${API_KEY}`);
          const json = await response.json();

          if (json.data && json.data.length > 0) {
            const newCityData = json.data[0]
            const cityName = newCityData.city_name

            setForecast({ ...forecast, [cityName]: newCityData });
            setFilteredResults([[cityName, newCityData]]);
          } else {
            setFilteredResults([]);
          }
        }
        catch (error) {
          console.error("Uh Oh! An error happened:", error)
          setFilteredResults([]);
        }
      }
    }
    else {
      setFilteredResults(Object.entries(forecast))
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const cities = ['New York', 'Los Angeles', 'San Francisco', 'Chicago', 'London',
        'Tokyo', 'Singapore', 'Toronto', 'Dubai', 'Paris', 'Madrid', 'Guadalajara', 'Cancun', 'Ho Chi Minh City', 'Nha Trang'];
      const results = {};

      for (const city of cities) {
        const response = await fetch(
          `https://api.weatherbit.io/v2.0/current?city=${city}&units=${units}&key=${API_KEY}`);
        const json = await response.json();
        results[city] = json.data[0];
      }

      setForecast(results);
      setFilteredResults(Object.entries(results));
    };
    fetchWeather().catch(console.error);

  }, [units]);

  return (
    <div className='whole-page'>
      <h1>Weather Forecast</h1>
      {forecast && (
        <div className='dashboard'>
          <h2>Total Number of Cities: {Object.keys(forecast).length}</h2>
          <h2>Average Temperature Across Cities Below: {avgTemp}°{units === "I" ? "F" : "C"}</h2>
          <h2>Hottest City: {Object.values(forecast).reduce((prev, current) =>
            current.temp > prev.temp ? current : prev).city_name}</h2>
          <h2>Coldest City: {Object.values(forecast).reduce((prev, current) =>
            current.temp < prev.temp ? current : prev).city_name}</h2>
        </div>
      )}
      <div className='controls'>
        <div className='search-switch'>
          <input type='text' placeholder='Search by city'
            onChange={(e) => searchItems(e.target.value)}
            value={searchInput} />

          <button onClick={() => setUnits(units === "I" ? "M" : "I")}>
            Switch to {units === "I" ? "Celsius °C" : "Fahrenheit °F"}
          </button>
        </div>
        <div className='slider'>
          <label>
            Min Temperature: {CurrentTemp}°
            <input type="range" min={minTempNum} max={maxtempNum}
              value={CurrentTemp} onChange={(e) => setCurrentTemp(Number(e.target.value))} />
          </label>
        </div>
      </div>
      <>
        {searchInput.length > 0 && filteredResults.length === 0 ? (
          <p>No matching cities found.</p>
        ) : (
          filteredResults.filter(([i, weatherData]) => weatherData.temp >= CurrentTemp)
            .map(([city, weatherData]) => (
              <WeatherInfo key={city}
                city_name={weatherData.city_name}
                country_code={weatherData.country_code}
                state_code={weatherData.state_code}
                temp={weatherData.temp}
                weather={weatherData.weather}
                wind_spd={weatherData.wind_spd}
                gust={weatherData.gust}
                rh={weatherData.rh}
                aqi={weatherData.aqi}
                clouds={weatherData.clouds}
                units={units} />
            )))}
      </>
    </div>
  )
}
export default App;


