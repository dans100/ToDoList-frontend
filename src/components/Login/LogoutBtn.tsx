import React from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";



export const LogoutBtn = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        await Cookies.remove('access_token');
        navigate('/login');
    }

    return (
        <button
            className='login'
            onClick={handleClick}>
            Logout
        </button>
    )
}
