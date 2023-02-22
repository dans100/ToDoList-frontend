import './TodoList.css';
import React, {useContext, useEffect, useState} from "react";
import {TodoTable} from "./TodoTable";
import { TaskEntity } from 'types';
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";
import {apiURL} from "../../config/api";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";
import {Header} from "../Layout/Header";
import {SearchContext} from "../../contexts/search.context";



export const TodoList = () => {
    const {search} = useContext(SearchContext);
    const [list, setList] = useState<TaskEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const token = Cookies.get('access_token');

    const refreshList = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${apiURL}/list/${search}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            const data = await res.json();
            setList(data);
            setIsLoading(false);
        } catch (e) {
            setError('Error occurred by get api data');
        } finally {
            setIsLoading(false);
        }
    };


 useEffect(() => {
         refreshList();

 }, [search]);

    return (
        <>
            {error && <ErrorModal onConfirm={() => setError('')} title={'Invalid API Response'} message={error}/>}
            {isLoading && <Spinner/>}
            <Header/>
            <TodoTable list={list} onChangeList={refreshList}/>
        </>
    )
}

