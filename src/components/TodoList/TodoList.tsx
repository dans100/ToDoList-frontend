import './TodoList.css';
import React, { useContext, useEffect, useState } from 'react';
import { TodoTable } from './TodoTable';
import { TaskEntity } from 'types';
import { Spinner } from '../../common/Spinner/Spinner';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { Header } from '../Layout/Header';
import { SearchContext } from '../../contexts/search.context';
import { useHttp } from '../../hooks/use-http';

export const TodoList = () => {
  const { search, setSearchError } = useContext(SearchContext);
  const [list, setList] = useState<TaskEntity[]>([]);
  const { isLoading, error, setError, sendRequest } = useHttp();

  const refreshList = async () => {
    const setTaskList = (fetchList: TaskEntity[]) => {
      setList(fetchList);
    };

    sendRequest(
      {
        url: `${apiURL}/list/${search}`,
      },
      setTaskList
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
      <Header />
      <h1 className="main-title">ToDoList</h1>
      <TodoTable list={list} onChangeList={refreshList} />
    </>
  );
};
