import React from "react";
import './Header.css';
import {Button} from "../../common/Button/Button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LogoutBtn} from "../Login/LogoutBtn";



export const Header = () => {
    return (
        <header>
            <form className="search" >
                <input type="text" placeholder='Search todo'/>
                <Button className='search' type='button' onClick={()=>{}}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
            </form>
            <LogoutBtn/>
        </header>
    )
}
