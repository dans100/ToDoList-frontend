import { Spinner } from '../../common/Spinner/Spinner';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from '../Calendar/Calendar';
import './AddTask.css';
import { useHttp } from '../../hooks/use-http';
import { TaskEntity } from 'types';

interface Props {
  onChangeList: () => void;
}

export const AddTask = (props: Props) => {
  const [description, setDescription] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const { isLoading, error, setError, sendRequest } = useHttp();

  const calendarHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setOpenDatePicker(!openDatePicker);
  };

  const handleChange = (e: Date) => {
    setDeadline(new Date(e.getFullYear(), e.getMonth(), e.getDate() + 1));
    setOpenDatePicker(!openDatePicker);
  };

  const refreshList = (data: TaskEntity[]) => {
    props.onChangeList();
  };

  const sendForm = async (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      return;
    }
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
    sendRequest(
      {
        url: `${apiURL}/list`,
        method: 'POST',
        body: { description, deadline },
      },
      refreshList
    );
    setDescription('');
    setDeadline(null);
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
      {isLoading && <Spinner />}
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
