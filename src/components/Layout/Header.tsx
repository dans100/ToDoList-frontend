import React, {SyntheticEvent, useContext, useState} from "react";
import './Header.css';
import {Button} from "../../common/Button/Button";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LogoutBtn} from "../Login/LogoutBtn";
import {SearchContext} from "../../contexts/search.context";



export const Header = () => {
    const [inputVal, setInputVal] = useState<string>('');
    const {setSearch} = useContext(SearchContext);

    const setSearchHandler = (e:SyntheticEvent )=> {
        e.preventDefault();
        setSearch(inputVal);
    }


    return (
        <header>
            <form className="search" onSubmit={setSearchHandler}>
                <input type="text" placeholder='Search todo' value={inputVal} onChange={(e) => setInputVal(e.target.value) }/>
                <Button className='search' type='button' onClick={() => setSearch(inputVal)}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
            </form>
            <LogoutBtn/>
        </header>
    )
}
