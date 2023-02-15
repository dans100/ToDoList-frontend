import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useState
} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {apiURL} from "../../config/api";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";


export const Login = () => {

    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);
    const token = Cookies.get('access_token');


    useEffect(() => {

        (async () => {
            const response = await fetch(`${apiURL}/login`, {
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

        if (loginData.password.trim().length === 0 || loginData.email.trim().length === 0) {
            setError("Please enter a valid email and password (non-empty values).");
            return;
        }

        const response = await fetch(`${apiURL}/login`, {
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
    }

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData(loginData => ({
            ...loginData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleTogglePassword = (e: React.MouseEvent) => {
        e.preventDefault();
        isPwdVisible ? setIsPwdVisible(false) : setIsPwdVisible(true);
    }

    if (isLogged) {
        navigate('/list');
    }

    return (
        <>
            {error &&
                    <ErrorModal onConfirm={() => setError('')} title="Invalid input" message={error}/>
            }
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
                                type={isPwdVisible ? 'text' : 'password'}
                                name="password"
                                value={loginData.password}
                                onChange={change}
                            />
                        </label>
                        <button onClick={handleTogglePassword} className="show-pwd"><FontAwesomeIcon
                            icon={isPwdVisible ? faEyeSlash : faEye}/></button>
                    </p>
                    <p className='line'>
                        <button className='login'>Login</button>
                    </p>
                </div>
            </form>

        </>
    )
}

