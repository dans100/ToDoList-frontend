import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodoListView} from "./views/TodoListView";
import {NotFoundView} from "./views/NotFoundView";
import {Login} from "./components/Login/Login";
import {SearchContext} from './contexts/search.context';
import {Register} from "./components/Register/Register";
import {DeadlinesView} from "./views/DeadlinesView";
import {ThemeContext} from "./contexts/theme.context";
import {DarkMode} from "./components/DarkMode/DarkMode";


export const App = () => {

    const [search, setSearch] = useState('');
    const [searchError, setSearchError] = useState(false);
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(curr => curr === 'light' ? 'dark' : 'light');
    }

    return (

        <SearchContext.Provider value={{search, setSearch, searchError, setSearchError}}>
            <ThemeContext.Provider value={{theme, toggleTheme}}>
                <div id={theme}>
                    <Routes>
                        <Route path='/deadlines' element={<DeadlinesView/>}/>
                        <Route path='/list' element={<TodoListView/>}/>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/*' element={<NotFoundView/>}/>
                    </Routes>
                   <DarkMode/>
                </div>
            </ThemeContext.Provider>
        </SearchContext.Provider>
    );
}


