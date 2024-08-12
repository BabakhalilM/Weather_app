import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from './ContextApi';

const Search = () => {
    const { setCity, fetchWeather } = useContext(FavoritesContext)
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input) {
            setCity(input);
            fetchWeather(input);
            setInput('');
        }
    };
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
            // root.style.backgroundImage='url(https://i.pinimg.com/564x/ea/d0/cb/ead0cb2fd12aff988b27f69840ab98c4.jpg)'
        } else {
            root.classList.add('light-mode');
            root.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "#3133", padding: "5px" }}>
                <Link to='/'>
                    <img width={"50px"} style={{ borderRadius: "50%" }} src="https://th.bing.com/th/id/OIP.LZ2GNPpdZpUuTC3a27pfJQHaH_?pid=ImgDet&w=179&h=193&c=7&dpr=1.3" alt="" />
                </Link>
                <div style={{ margin: "auto" }}>
                    <div >
                        <input
                        type="text"
                        style={{
                            width: '200px',
                            height: '35px',
                            borderRadius: '10px'
                        }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter City Name"
                        />
                        <button style={{ margin: "5px" }} onClick={handleSearch}>Search</button>
                    </div>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                    <Link to={"/favorites"}>
                        <span style={{color:"white", display: 'flex', alignItems: 'center', justifyContent: 'center' }} class="material-symbols-outlined">
                            favorite
                        </span>
                    </Link>
                    <button onClick={toggleTheme} style={{ padding: '10px', cursor: 'pointer' }}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
