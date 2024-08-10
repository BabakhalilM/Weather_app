import React, { useContext } from 'react';
import { FavoritesContext } from './ContextApi';

const Favorites = () => {
    const {favorites, removeFavorite, addFavorite, handlecitysearch
    } = useContext(FavoritesContext);

    return (
        <div className="favorites">
        
            <h2>Favorite Cities</h2>
            <ul>
                {favorites.map((city, index) => (
                    <li key={index}>
                        <span onClick={()=>handlecitysearch(city)}>{city}</span>
                        <button style={{backgroundColor:"red"}} onClick={() => removeFavorite(city)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addFavorite(prompt('Enter city name to add to favorites'))}>
                Add Favorite
            </button>
        </div>
    );
};

export default Favorites;
