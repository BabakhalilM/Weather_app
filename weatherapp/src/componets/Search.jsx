import React, { useEffect, useState } from 'react';

const Search = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSearch = () => {
        if (input) {
            onSearch(input);
            setInput('');
        }
    };
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        const root = document.documentElement; // Target the <html> element
        if (isDarkMode) {
            root.classList.add('dark-mode');
            root.classList.remove('light-mode');
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
                <img width={"50px"} style={{ borderRadius: "50%" }} src="https://th.bing.com/th/id/OIP.LZ2GNPpdZpUuTC3a27pfJQHaH_?pid=ImgDet&w=179&h=193&c=7&dpr=1.3" alt="" />
                <div style={{ margin: "auto" }}>
                    <div >
                        <input
                            type="text"
                            height="30px"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter city"
                        />
                        <button style={{ margin: "5px" }} onClick={handleSearch}>Search</button>
                    </div>

                </div>
                <div style={{ margin: "auto" }}>
                    {/* <span class="material-symbols-outlined">
favorite
</span> */}
                    <button onClick={toggleTheme} style={{ padding: '10px', cursor: 'pointer' }}>
                        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Search;
