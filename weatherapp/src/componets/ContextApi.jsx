import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    
    const [favorites, setFavorites] = useState([]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [location,setLocation]=useState(null);
    const [city, setCity] = useState('Mumbai');
    const [isCelsius, setIsCelsius] = useState(true);
    const navigate = useNavigate();
    const handlecitysearch=async(city)=>{
        console.log(city);
        setCity(city);
        await fetchWeather(city);
        navigate("/");
    }
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
        }else{
        const newFavorites = [...favorites, city];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
            alert(`${city} added to Favorites`);
        }
    };
    

    const removeFavorite = (cityToRemove) => {
        const newFavorites = favorites.filter(city => city !== cityToRemove);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };
    
    const apiKey = '2257cbd22fmshe9a4a94130539b4p101612jsn4492fb17d064'; 

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



    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                handlecitysearch,
                addFavorite,
                removeFavorite,
                fetchWeather,
                setCity,
                setIsCelsius,
                isCelsius,
                forecast,
                location,
                currentWeather,
                
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};
