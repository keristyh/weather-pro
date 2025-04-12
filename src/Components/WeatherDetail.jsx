import React, { Component, useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import WeatherInfo from "../Components/WeatherInfo";
const API_KEY = import.meta.env.VITE_APP_API_KEY;


function WeatherDetail() {
    const { city } = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    const { units } = useOutletContext();

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&units=${units}&key=${API_KEY}`)
            const json = await response.json();
            if (json.data && json.data.length > 0) {
                setFullDetails(json.data[0])
            }
        }
        fetchDetail();
    }, [city, units]);

    if (!fullDetails) {
        return <p>Loading details for “{city}”…</p>;
    }

    return (
        <div className='detail-page'>
            <Link to="/">← Back to Dashboard</Link>
            <WeatherInfo {...fullDetails} units={units} />

            <div className="extra-details">
                <p><strong>Sunrise:</strong> {fullDetails.sunrise}</p>
                <p><strong>Sunset:</strong> {fullDetails.sunset}</p>
                <p><strong>Pressure:</strong> {fullDetails.pres}</p>
                <p><strong>Visibility:</strong> {fullDetails.vis}</p>
                <p><strong>Dew Point:</strong> {fullDetails.dewpt}°{units === "I" ? "F" : "C"}</p>
                <p><strong>UV Index:</strong> {fullDetails.uv}</p>
            </div>
        </div>
    )
}
export default WeatherDetail;