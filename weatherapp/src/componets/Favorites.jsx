import React from 'react';

const Favorites = ({ favorites, onRemoveFavorite, onAddFavorite, handlecitysearch }) => {
    return (
        <div className="favorites">
            <hr />
            <h2>Favorite Cities</h2>
            <ul>
                {favorites.map((city, index) => (
                    <li key={index}>
                        <span onClick={()=>handlecitysearch(city)}>{city}</span>
                        <button style={{backgroundColor:"red"}} onClick={() => onRemoveFavorite(city)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => onAddFavorite(prompt('Enter city name to add to favorites'))}>
                Add Favorite
            </button>
        </div>
    );
};

export default Favorites;
