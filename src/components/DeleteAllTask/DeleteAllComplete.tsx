import React from 'react';
import { apiURL } from '../../config/api';
import { Spinner } from '../../common/Spinner/Spinner';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { Button } from '../../common/Button/Button';
import './DeleteAllTask.css';
import { useHttp } from '../../hooks/use-http';
import { TaskEntity } from 'types';

interface Props {
  onChangeList: () => void;
}

export const DeleteAllComplete = (props: Props) => {
  const { isLoading, error, setError, sendRequest } = useHttp();

  const refreshList = (data: TaskEntity[]) => {
    props.onChangeList();
  };

  const onDeleteComplete = async () => {
    if (!window.confirm(`Are you sure to clear complete tasks`)) {
      return;
    }
    sendRequest(
      {
        url: `${apiURL}/list/complete`,
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
      <Button className="delete-btn" type="button" onClick={onDeleteComplete}>
        Clear Complete
      </Button>
    </>
  );
};
