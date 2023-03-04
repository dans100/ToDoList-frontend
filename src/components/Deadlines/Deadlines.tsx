import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Deadlines.css';

import moment from 'moment';
import { SearchContext } from '../../contexts/search.context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { Spinner } from '../../common/Spinner/Spinner';
import { TaskEntity } from 'types';

export const Deadlines = () => {
  const { search, setSearchError } = useContext(SearchContext);
  const [selectedTask, setSelectedTask] = useState<TaskEntity | null>(null);
  const [list, setList] = useState<TaskEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const token = Cookies.get('access_token');
  const navigate = useNavigate();

  const clickHandler = (date: Date) => {
    const taskWithDeadline: TaskEntity | undefined = list.find((task) =>
      moment(task.deadline).isSame(date, 'day')
    );
    if (taskWithDeadline) {
      setSelectedTask(taskWithDeadline);
    } else {
      return null;
    }
  };

  const refreshList = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${apiURL}/list/${search}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (res.status === 401) {
        navigate('/');
      } else {
        const data = await res.json();
        setList(data);
        setIsLoading(false);
      }
    } catch (e) {
      setError('Error occurred by get api data');
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshList();
  }, [search]);

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => {
            setError('');
            setSearchError(false);
          }}
          title={'Invalid API Response'}
          message={error}
        />
      )}
      {isLoading && <Spinner />}
      <h1 className="text-center">Deadlines</h1>
      <div className="deadlines">
        <div className="deadlines-container">
          <Calendar
            tileClassName={({ date, view }) => {
              const taskWithDeadline = list.find((task) =>
                moment(task.deadline).isSame(date, 'day')
              );
              if (taskWithDeadline && view === 'month') {
                return 'highlight';
              } else {
                return null;
              }
            }}
            onClickDay={clickHandler}
            tileDisabled={({ date, view }) => {
              const taskWithDeadline = list.find((task) =>
                moment(task.deadline).isSame(date, 'day')
              );
              if (view === 'month') {
                return !taskWithDeadline;
              } else {
                return false;
              }
            }}
          />
          {selectedTask && (
            <ErrorModal
              onConfirm={() => setSelectedTask(null)}
              title="Description"
              message={selectedTask.description}
            />
          )}
        </div>
      </div>
    </>
  );
};
