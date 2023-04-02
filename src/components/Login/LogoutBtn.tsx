import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../config/api';
import { Spinner } from '../../common/Spinner/Spinner';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';

export const LogoutBtn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const Logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiURL}/logout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include',
      });
      if (response.ok) {
        navigate('/');
      } else {
        navigate('/list');
      }
    } catch (e) {
      setError('Error occurred by log out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title="Invalid log out"
          message={error}
        />
      )}
      {loading && <Spinner />}
      <button className="logout" onClick={Logout}>
        Logout
      </button>
    </>
  );
};
