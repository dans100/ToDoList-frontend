import './TodoList.css';
import React, {useEffect, useState} from "react";
import {TodoTable} from "./TodoTable";
import { TaskEntity } from 'types';
import {Spinner} from "../../common/Spinner/Spinner";


export const TodoList = () => {
    const [list, setList] = useState<TaskEntity[] | null>(null);

    const refreshList = async () => {
        setList(null);
        try {
            const res = await fetch('http://localhost:3001/list');
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            setList(data);
        } catch (err) {
            console.error('Wystąpił błąd podczas pobierania danych:', err);
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
            <h2>Lista zadań</h2>
            <TodoTable list={list} onChangeList={refreshList}/>
        </>
    )
}
