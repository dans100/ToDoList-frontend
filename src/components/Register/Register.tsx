import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { apiURL } from '../../config/api';
import { Spinner } from '../../common/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [isPwdVisible, setIsPwdVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successRegister, setSuccessRegister] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTogglePassword = (e: React.MouseEvent) => {
    e.preventDefault();
    isPwdVisible ? setIsPwdVisible(false) : setIsPwdVisible(true);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((registerData) => ({
      ...registerData,
      [e.target.name]: e.target.value,
    }));
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();

    if (
      registerData.username.trim().length < 3 ||
      registerData.username.trim().length > 55
    ) {
      setError(
        'User name cannot be shorter than 3 characters and later than 55 characters'
      );
      return;
    }
    if (!registerData.email.includes('@')) {
      setError('Email should contain character @');
      return;
    }
    if (
      registerData.password.trim().length < 7 ||
      registerData.password.trim().length > 60
    ) {
      setError(
        'Password cannot be shorter than 7 characters and later than 60 characters'
      );
      return;
    }

    if (registerData.password.trim() !== registerData.confirmPassword.trim()) {
      setError('Passwords is incorrect');
    }

    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.status === 201) {
        setSuccessRegister(true);
      }
      if (response.status === 409) {
        setError(data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title="Invalid input"
          message={error}
        />
      )}
      {successRegister && (
        <ErrorModal
          onConfirm={() => navigate('/')}
          title="Success"
          message="Thank you for registering. You can now log in to your account."
        />
      )}
      <form className="register-form" onSubmit={sendForm}>
        <div className="register-box">
          <p className="line">
            <label>
              Username
              <input
                className="register"
                type="text"
                name="username"
                placeholder="Username"
                value={registerData.username}
                onChange={onChangeInput}
              />
            </label>
          </p>
          <p className="line">
            <label>
              E-mail:
              <input
                className="register"
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={onChangeInput}
              />
            </label>
          </p>
          <p className="line">
            <label>
              Password:
              <input
                className="register"
                type={isPwdVisible ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={onChangeInput}
              />
            </label>
            <button
              type="button"
              onClick={handleTogglePassword}
              className="show-pwd-register"
            >
              <FontAwesomeIcon icon={isPwdVisible ? faEyeSlash : faEye} />
            </button>
          </p>
          <p className="line">
            <label>
              Confirm password:
              <input
                className="register"
                type={isPwdVisible ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm password"
                value={registerData.confirmPassword}
                onChange={onChangeInput}
              />
            </label>
          </p>
          <p className="line">
            <button type="submit" className="login">
              Register
            </button>
          </p>
          <p>
            Already have an account? <a href="/">Login</a>
          </p>
        </div>
      </form>
    </>
  );
};
