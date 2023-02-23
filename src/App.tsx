import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodoListView} from "./views/TodoListView";
import {NotFoundView} from "./views/NotFoundView";
import {Login} from "./components/Login/Login";
import { SearchContext } from './contexts/search.context';
import {Register} from "./components/Register/Register";



export const App = () => {

    const [search, setSearch] = useState('');

    return (
        <SearchContext.Provider value={{search, setSearch}}>
        <Routes>
            <Route path='/list' element={<TodoListView/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/*' element={<NotFoundView/>}/>
        </Routes>
        </SearchContext.Provider>
    );
}


