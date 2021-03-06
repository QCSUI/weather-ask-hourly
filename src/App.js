import './App.css'
import React,{ useState } from 'react';

import ForecastChart from './components/ForecastChart'

const api = {
  key: "baebc458dfa09c720fa62105163fd0b5",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast,setForecast] = useState({});
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)  // fetch the current weather
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        .then(fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)  // fetch the weather forecast in the next 5 days 
                .then(res => res.json())
                .then(result => setForecast(result))
              )
        .catch(err=>{console.error(err)}); 
    }
  }
  /**
   * Change the date format to display
   *
   * @param d  A Date() obj 
   *
   * @return {string} Eurpeam format of time
   */
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
          <div className="header">{"Current Weather"}</div>
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          <div className="chart">
          <div className="header">{"Weather Forecast in the following 5 days"}</div>
          <ForecastChart data = {forecast} classname="chart"/>
        </div>
        </div>
        ) : ('')}

      </main>
    </div>
  );
}



export default App;