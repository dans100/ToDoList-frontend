import React from 'react';
import { Button } from '../../common/Button/Button';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { Spinner } from '../../common/Spinner/Spinner';
import './DeleteAllTask.css';
import { useHttp } from '../../hooks/use-http';
import { TaskEntity } from 'types';

interface Props {
  onChangeList: () => void;
}

export const DeleteAllTask = (props: Props) => {
  const { isLoading, error, setError, sendRequest } = useHttp();

  const refreshList = (data: TaskEntity[]) => {
    props.onChangeList();
  };

  const onDeleteAll = async () => {
    if (!window.confirm(`Are you sure to clear list`)) {
      return;
    }

    sendRequest(
      {
        url: `${apiURL}/list`,
        method: 'DELETE',
      },
      refreshList
    );
  };

  return (
    <>
      {isLoading && <Spinner />}
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title="Failed to remove tasks from list"
          message={error}
        />
      )}
      <Button className="delete-btn" type="button" onClick={onDeleteAll}>
        Clear All
      </Button>
    </>
  );
};
