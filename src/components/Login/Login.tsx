import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export const Login = () => {

    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const token = Cookies.get('access_token');

    useEffect(() => {
        (async () => {
            const response = await fetch('http://localhost:3001/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            if (response.ok) {
                setIsLogged(true);
            }

        })();
    }, []);


    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.status === 200) {
                await Cookies.set('access_token', data.token);
                setIsLogged(true);
            } else {
                setError(data.message)
            }

        } catch (e) {
            console.error(e);
        }

    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData(loginData => ({
            ...loginData,
            [e.target.name]: e.target.value,
        }))
    }

    if (isLogged) {
        navigate('/list');
    }

    return (
        <>
            <h2>LOGIN TO SEE TASKS</h2>
            <form className='table' onSubmit={sendForm}>
                <div className='box'>
                    <p className='line'>
                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={change}
                            />
                        </label>
                    </p>
                    <p className='line'>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={change}
                            />
                        </label>
                    </p>
                    <p className='line'>
                        <button className='login'>Login</button>
                    </p>
                </div>
            </form>
            {{error} && <h2>{error}</h2>}
        </>
    )
}

