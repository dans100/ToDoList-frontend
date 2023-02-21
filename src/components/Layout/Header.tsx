import React from "react";
import './Header.css';
import {Button} from "../../common/Button/Button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export const Header = () => {
    return (
        <header>
            <form className="search" >
                <input type="text" placeholder='Search todo'/>
                <Button className='search' type='button' onClick={()=>{}}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
            </form>
            <Button className='logout' type='button' onClick={() => {}}>Logout</Button>
        </header>
    )
}
