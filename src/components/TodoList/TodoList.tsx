import './TodoList.css';
import React, {useEffect, useState} from "react";
import {TodoTable} from "./TodoTable";
import { TaskEntity } from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";



export const TodoList = () => {
    const [list, setList] = useState<TaskEntity[] | null>(null);
    const token = Cookies.get('access_token');

    const refreshList = async () => {
        setList(null);
        try {
            const res = await fetch('http://localhost:3001/list', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            const data = await res.json();
            setList(data);
        } catch (e) {
            console.error(e);
        }
    };

 useEffect(() => {
         refreshList();

 }, []);

 if(list === null) {
     return (
         <Spinner/>
     )
 }
    return (
        <>
            <h2>Todo List</h2>
            <TodoTable list={list} onChangeList={refreshList}/>
        </>
    )
}
