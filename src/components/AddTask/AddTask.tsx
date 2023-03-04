import { Spinner } from '../../common/Spinner/Spinner';
import Cookies from 'js-cookie';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { useNavigate } from 'react-router-dom';
import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from '../Calendar/Calendar';
import './AddTask.css';

interface Props {
  onChangeList: () => void;
}

export const AddTask = (props: Props) => {
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const token = Cookies.get('access_token');
  const navigate = useNavigate();

  const calendarHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setOpenDatePicker(!openDatePicker);
  };

  const handleChange = (e: Date) => {
    setDeadline(new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1));
    setOpenDatePicker(!openDatePicker);
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      return;
    }
    try {
      if (description.length < 3 || description.length > 55) {
        setError(
          'Task cannot be shorter than 3 characters and later than 55 characters'
        );
        return;
      }
      if (!deadline) {
        if (!window.confirm('Want to add a task without deadline?')) {
          return;
        }
      }
      setLoading(true);
      const res = await fetch(`${apiURL}/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description, deadline }),
        credentials: 'include',
      });
      if (res.status === 401) {
        navigate('/');
      } else {
        props.onChangeList();
        await res.json();
      }
    } catch (e) {
      setError('Error occurred on server on task add');
    } finally {
      setLoading(false);
      setDeadline(null);
      setDescription('');
    }
  };

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title="Invalid task add"
          message={error}
        />
      )}
      {loading && <Spinner />}
      {openDatePicker && (
        <Calendar
          onCloseDatePicker={calendarHandler}
          onChange={handleChange}
          date={deadline}
        />
      )}
      <form onSubmit={sendForm}>
        <input
          className="add-task"
          type="text"
          placeholder="Add task"
          value={description}
          maxLength={55}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!!error}
        />
        <button type="button" className="calendar" onClick={calendarHandler}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </button>
        <button type="submit" className="submit">
          <FontAwesomeIcon icon={faCircleUp} />
        </button>
      </form>
    </>
  );
};
