import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({
    email: '',
    pwd: '',
  });
  const [error, setError] = useState<string>('');
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${apiURL}/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    if (error) {
      return;
    }
    try {
      if (
        loginData.pwd.trim().length === 0 ||
        loginData.email.trim().length === 0
      ) {
        setError('Please enter a valid email and password');
        return;
      }
      const response = await fetch(`${apiURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setIsLogged(true);
      } else {
        setError(data.error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoginData({
        email: '',
        pwd: '',
      });
    }
  };

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((loginData) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    isPwdVisible ? setIsPwdVisible(false) : setIsPwdVisible(true);
  };

  if (isLogged) {
    navigate('/list');
  }

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title="Invalid input"
          message={error}
        />
      )}
      <form className="table" onSubmit={sendForm}>
        <div className="box">
          <p className="line">
            <label>
              E-mail:
              <input
                className="login-data"
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={change}
                disabled={!!error}
              />
            </label>
          </p>
          <p className="line">
            <label>
              Password:
              <input
                className="login-data"
                type={isPwdVisible ? 'text' : 'password'}
                name="pwd"
                placeholder="Password"
                value={loginData.pwd}
                onChange={change}
                disabled={!!error}
              />
            </label>
            <button
              type="button"
              onClick={handleTogglePassword}
              className="show-pwd"
            >
              <FontAwesomeIcon icon={isPwdVisible ? faEyeSlash : faEye} />
            </button>
          </p>
          <p className="line">
            <button type="submit" className="login">
              Login
            </button>
          </p>
          <p>
            Don't have an account? <a href="/register">Register one!</a>
          </p>
        </div>
      </form>
    </>
  );
};
