import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {TodoListView} from "./views/TodoListView";
import {NotFoundView} from "./views/NotFoundView";
import {Login} from "./components/Login/Login";



export const App = () => {

    return (

        <Routes>
            <Route path='/list' element={<TodoListView/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/*' element={<NotFoundView/>}/>
        </Routes>
    );
}


