import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import './Header.css';
import { Button } from '../../common/Button/Button';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutBtn } from '../Login/LogoutBtn';
import { SearchContext } from '../../contexts/search.context';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState('');
  const [inputVal, setInputVal] = useState<string>('');
  const { setSearch, searchError } = useContext(SearchContext);

  const setSearchHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setSearch(inputVal);
  };

  useEffect(() => {
    switch (location.pathname) {
      case '/list':
        setBtnText('Deadlines');
        break;

      case '/deadlines':
        setBtnText('List');
        break;

      default:
        setBtnText('');
    }
  }, [location]);

  const handleClick = () => {
    if (btnText === 'Deadlines') {
      navigate('/deadlines');
    }

    if (btnText === 'List') {
      navigate('/list');
    }
  };

  return (
    <header>
      <form className="search" onSubmit={setSearchHandler}>
        <input
          className="search"
          type="text"
          placeholder="Search todo"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={searchError}
        />
        <Button
          className="search"
          type="button"
          onClick={() => {
            setSearch(inputVal);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Button>
      </form>
      <Button className="logout" type="button" onClick={handleClick}>
        {btnText}
      </Button>
      <LogoutBtn />
    </header>
  );
};
