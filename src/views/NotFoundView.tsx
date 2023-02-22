import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "../common/Button/Button";
import './NotFoundView.css';

export const NotFoundView = () => {
    const navigate = useNavigate();

    const handleButton = () => {
        navigate('/');
    }

        return (
        <div className="not-found">
            <div className="not-found-header">
                <h2>Error 404</h2>
            </div>
            <div className="not-found-content">
                <p>Not found page</p>
            </div>
            <footer className="modal-actions">
                <Button className='confirm' type="submit" onClick={handleButton}>Go Home</Button>
            </footer>
        </div>
        );
}
