import React from "react";
import {useNavigate} from "react-router-dom";
import {apiURL} from "../../config/api";



export const LogoutBtn = () => {
    const navigate = useNavigate();

    const Logout = async () => {

        const response = await fetch(`${apiURL}/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include',
        });
        if (response.status === 204) {
            navigate('/');
        } else {
            navigate('/list');
        }
    }


    return (
        <button
            className='login'
            onClick={Logout}>
            Logout
        </button>
    )
}
