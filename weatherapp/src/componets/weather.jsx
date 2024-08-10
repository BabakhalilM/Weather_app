import React from 'react';

const WeatherDisplay = ({ currentWeather, forecast, location, isCelsius,onAddFavorite }) => {
    function getDayName(dateString) {
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const date = new Date(dateString);
        const dayIndex = date.getDay(); // Returns a number between 0 (Sunday) and 6 (Saturday)
    
        return daysOfWeek[dayIndex];
    }
    if (!currentWeather || !forecast) return null;

    const temperatureUnit = isCelsius ? 'C' : 'F';
    const convertTemp = (tempC) => isCelsius ? tempC.toFixed(1) : ((tempC * 9 / 5) + 32).toFixed(1);

    return (
        <div>
            <h1><span style={{fontWeight:"300"}}>Current Weather In:</span> {location.name}, {location.region} </h1>
            <div style={{ border: "1px solid" }}>
                <p style={{ color: "green" }}><span style={{fontWeight:"900px"}}>Updated On :</span> {location.localtime}</p>
                <p>Temperature: {convertTemp(currentWeather.temp_c)}°{temperatureUnit}</p>
                <p>Condition: {currentWeather.condition.text}</p>
                <p>Humidity: {currentWeather.humidity}%</p>
                <button onClick={() => onAddFavorite(location.name)}>
                Add {location.name} as Favorite
            </button>
            </div>
            <h2 style={{textAlign:"center"}}>3-Days Forecast</h2>
            <div style={{display:"flex",justifyContent:"space-around",borderRadius:"20px",flexWrap:"wrap"}}>
            {forecast.forecastday.map(day => (
                <div key={day.date_epoch} style={{ padding:"15px", margin:"5px", borderRadius:"10px",boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",border:"1px solid" }}>
                    <h3 style={{textAlign:"center"}}>{day.date} ({getDayName(day.date)})</h3>
                    <div className='astro'>
                        <hr />
                        <p><span>Sunrise </span>{day.astro.sunrise} <span>, Sunset </span>{day.astro.sunset}</p>
                        <p><span>Moonrise </span>{day.astro.moonrise} <span>, Moonset </span>{day.astro.moonset}</p><hr />
                    </div>
                    <div key={day.date_epoch}>
                        <p>High: {convertTemp(day.day.maxtemp_c)}°{temperatureUnit}</p>
                        <p>Low: {convertTemp(day.day.mintemp_c)}°{temperatureUnit}</p>
                        <p>Condition: {day.day.condition.text}</p>
                    </div>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                            <select
                                style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
                                // onChange={(e) => handleHourChange(e.target.value)}
                            >
                                {day.hour.map((hour, index) => (
                                    <option key={index} value={hour.time}>
                                        <span style={{color:"yellow"}}>{hour.time.split(" ")[1]}</span> - {convertTemp(hour.temp_c)}°{temperatureUnit}, H {hour.humidity}%
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
            ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;
