import React, {useContext, useState} from 'react';
import {ThemeContext} from "../../contexts/theme.context";
import './DarkMode.css'

export const DarkMode = () => {

    const {toggleTheme} = useContext(ThemeContext);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        toggleTheme();
    };

    return (
        <div className="dark-mode">
            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} id="toggle-darkmode"/>
            <label htmlFor="toggle-darkmode">
                <svg className="moon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path fill="#7e7e7e"
                              d="M240.448 240.448a384 384 0 1 0 559.424 525.696 448 448 0 0 1-542.016-542.08 390.592 390.592 0 0 0-17.408 16.384zm181.056 362.048a384 384 0 0 0 525.632 16.384A448 448 0 1 1 405.056 76.8a384 384 0 0 0 16.448 525.696z"></path>
                    </g>
                </svg>
            </label>
        </div>
    );
}
