import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { TaskEntity } from 'types';
import { Spinner } from '../../common/Spinner/Spinner';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { useHttp } from '../../hooks/use-http';

interface Props {
  task: TaskEntity;
  index: number;
  onChangeList: () => void;
}

export const TodoTableRow = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { description, id, isCompleted } = props.task;
  const [isComplete, setIsComplete] = useState<number>(isCompleted);
  const [editTaskValue, setEditTaskValue] = useState(description);
  const { isLoading, error, setError, sendRequest } = useHttp();

  const refreshList = (data: TaskEntity[]) => {
    props.onChangeList();
  };

  const deleteTask = async (e: React.MouseEvent) => {
    if (!window.confirm(`Are you sure to delete task: ${description}`)) {
      return;
    }
    sendRequest(
      {
        url: `${apiURL}/list/${id}`,
        method: 'DELETE',
      },
      refreshList
    );
  };

  const editTask = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (editTaskValue.length < 3 || editTaskValue.length > 55) {
      setError(
        'Task cannot be more than 3 characters and later than 55 characters'
      );
      return;
    }

    sendRequest(
      {
        url: `${apiURL}/list/${id}`,
        method: 'PATCH',
        body: { editTaskValue },
      },
      refreshList
    );
    setIsEditing(false);
  };

  const onCheckTask = async (e: React.MouseEvent) => {
    e.preventDefault();
    const newIsComplete = isComplete ? 0 : 1;
    setIsComplete(newIsComplete);

    sendRequest(
      {
        url: `${apiURL}/list/${id}/status`,
        method: 'PATCH',
        body: { isCompleted: newIsComplete },
      },
      refreshList
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title={'Error'}
          message={error}
        />
      )}
      {isLoading && <Spinner />}
      <tr className="line">
        <FontAwesomeIcon
          className="check"
          style={{ color: isComplete ? 'green' : '' }}
          icon={faCircleCheck}
          onClick={onCheckTask}
        />
        {isEditing ? (
          <td className="title">
            <input
              autoFocus={true}
              className="edit"
              type="text"
              maxLength={55}
              value={editTaskValue}
              onChange={(e) => setEditTaskValue(e.target.value)}
            />
            <FontAwesomeIcon
              className="pen"
              style={{ color: 'green' }}
              icon={faPen}
              onClick={editTask}
            />
          </td>
        ) : (
          <td
            className="title"
            style={
              isComplete
                ? {
                    backgroundColor: 'green',
                    textDecoration: 'line-through',
                  }
                : undefined
            }
          >
            {description}
            <FontAwesomeIcon
              className="pen"
              style={{ pointerEvents: isComplete ? 'none' : undefined }}
              icon={faPen}
              onClick={handleEditClick}
            />
            <FontAwesomeIcon
              className="trash"
              icon={faTrash}
              onClick={deleteTask}
            />
          </td>
        )}
      </tr>
    </>
  );
};
