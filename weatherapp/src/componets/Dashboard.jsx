import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './Search';
import WeatherDisplay from './weather';
import Favorites from './Favorites';

const Dashboard = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [location,setLocation]=useState(null);
    const [city, setCity] = useState('mumbai');
    const [favorites, setFavorites] = useState([]);
    const [isCelsius, setIsCelsius] = useState(true);

    const handlecitysearch=(city)=>{
        console.log(city);
        setCity(city);
        fetchWeather(city);
    }
    const apiKey = '2257cbd22fmshe9a4a94130539b4p101612jsn4492fb17d064'; // Replace with your actual WeatherAPI.com API key

    const fetchWeather = async (city) => {
        const options = {
            method: 'GET',
            url: `https://weatherapi-com.p.rapidapi.com/forecast.json`,
            params: {
                q: city,
                days: 7
            },
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setCurrentWeather(response.data.current);
            setForecast(response.data.forecast);
            setLocation(response.data.location);
            console.log(response.data);
            localStorage.setItem('lastSearchedCity', city);
        } catch (error) {
            console.error(error);
            alert("Place Not Found");
        }
    };

    useEffect(() => {
        const lastSearchedCity = localStorage.getItem('lastSearchedCity');
        if (lastSearchedCity) {
            fetchWeather(lastSearchedCity);
        }
    }, []);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const addFavorite = (city) => {
        const normalizedCity = city.trim().toLowerCase();
        const isDuplicate = favorites.some(fav => fav.toLowerCase() === normalizedCity);
        if (isDuplicate) {
            alert(`${city} is already in your favorites.`);
            return; 
        }
        const newFavorites = [...favorites, city];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    

    const removeFavorite = (cityToRemove) => {
        const newFavorites = favorites.filter(city => city !== cityToRemove);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };


    return (
        <div className="app">
            <Search  onSearch={(city) => {
                setCity(city);
                fetchWeather(city);
            }} />
            <button style={{borderRadius:"5px",padding:"12px",margin:"10px",border:"none",background:"gray",color:"white"}} onClick={() => setIsCelsius(!isCelsius)}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
            <WeatherDisplay
                onAddFavorite={addFavorite}
                currentWeather={currentWeather}
                forecast={forecast}
                location={location}
                isCelsius={isCelsius}
            />
            <Favorites
                favorites={favorites}
                handlecitysearch={handlecitysearch}
                onRemoveFavorite={removeFavorite}
                onAddFavorite={addFavorite}
            />
        </div>
    );
};

export default Dashboard;
