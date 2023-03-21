import React, { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Deadlines.css';

import moment from 'moment';
import { SearchContext } from '../../contexts/search.context';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { Spinner } from '../../common/Spinner/Spinner';
import { TaskEntity } from 'types';
import { useHttp } from '../../hooks/use-http';

export const Deadlines = () => {
  const { search, setSearchError } = useContext(SearchContext);
  const [selectedTask, setSelectedTask] = useState<TaskEntity | null>(null);
  const [list, setList] = useState<TaskEntity[]>([]);
  const { isLoading, error, setError, sendRequest } = useHttp();

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

  const updateList = (fetchData: TaskEntity[]) => {
    setList(fetchData);
  };

  const refreshList = async () => {
    sendRequest(
      {
        url: `${apiURL}/list/${search}`,
      },
      updateList
    );
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
