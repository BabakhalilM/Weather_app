import React, { useContext } from 'react';
import './Dashboard.css'
import WeatherDisplay from './weather';
import { FavoritesContext } from './ContextApi';

const Dashboard = () => {

    const {
        addFavorite,
        setIsCelsius,
        forecast,
        location,
        currentWeather,
        isCelsius } = useContext(FavoritesContext)
    return (
        <div className="app">

            <button style={{ borderRadius: "5px", padding: "12px", margin: "10px", border: "none", background: "gray", color: "white" }} onClick={() => setIsCelsius(!isCelsius)}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
            <WeatherDisplay
                onAddFavorite={addFavorite}
                currentWeather={currentWeather}
                forecast={forecast}
                location={location}
                isCelsius={isCelsius}
            />
        </div>
    );
};

export default Dashboard;
