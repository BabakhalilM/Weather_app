import React from 'react';

const ForecastCard = ({ day }) => {
    return (
        <div className="forecast-card">
            <h4>{day.date}</h4>
            <p>Max Temp: {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
            <p>Min Temp: {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
            <p>Condition: {day.day.condition.text}</p>
            <p>Sunrise: {day.astro.sunrise}</p>
            <p>Sunset: {day.astro.sunset}</p>
        </div>
    );
};

export default ForecastCard;
