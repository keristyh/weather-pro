import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const WeatherInfo = ({ city_name, state_code, country_code, weather, temp, wind_spd, gust, rh, aqi, clouds, units }) => {
    return (
        <div className="weather-card">
            <img className="weather-icon"
                src={`https://www.weatherbit.io/static/img/icons/${weather.icon}.png`}
                alt={weather.description} />
            <div className="weather-text">
                <strong>{city_name}, {state_code} {country_code}</strong><br />
                {weather.description} | {temp}°{units === "I" ? "F" : "C"}<br />
                Wind: {wind_spd} {units === "I" ? "mph" : "m/s"}
                {gust != null ? <> | Gust: {gust} {units === "I" ? "mph" : "m/s "}</> : null}
                | Air Quality Index: {aqi} |
                Humidity: {rh}% |
                Cloud Coverage: {clouds}%
            </div>
        </div>
    )
}
export default WeatherInfo;