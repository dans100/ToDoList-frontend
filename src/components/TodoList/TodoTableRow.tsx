import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPen,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { TaskEntity } from 'types';
import { Spinner } from '../../common/Spinner/Spinner';
import Cookies from 'js-cookie';
import { apiURL } from '../../config/api';
import { ErrorModal } from '../../common/ErrorModal/ErrorModal';
import { useNavigate } from 'react-router-dom';

interface Props {
  task: TaskEntity;
  index: number;
  onChangeList: () => void;
}

export const TodoTableRow = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { description, id, isCompleted } = props.task;
  const [isComplete, setIsComplete] = useState<number>(isCompleted);
  const [editTaskValue, setEditTaskValue] = useState(description);
  const token = Cookies.get('access_token');
  const navigate = useNavigate();

  const deleteTask = async (e: React.MouseEvent) => {
    if (
      !window.confirm(`Are you sure to delete task of id ${props.index + 1}`)
    ) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${apiURL}/list/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (res.status === 401) {
        navigate('/');
      } else {
        props.onChangeList();
        await res.json();
      }
    } catch (e) {
      setError('Error occurred on server on task delete');
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (editTaskValue.length < 3 || editTaskValue.length > 55) {
      setError(
        'Task cannot be more than 3 characters and later than 55 characters'
      );
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiURL}/list/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ editTaskValue }),
        credentials: 'include',
      });
      if (res.status === 401) {
        navigate('/');
      } else {
        props.onChangeList();
        await res.json();
      }
    } catch (e) {
      setError('Error occurred on server on task update');
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const updateTaskStatus = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiURL}/list/${id}/status`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isComplete }),
          credentials: 'include',
        });
        if (res.status === 401) {
          navigate('/');
        } else {
          props.onChangeList();
          await res.json();
        }
      } catch (e) {
        setError('Error occurred on server on task update');
      } finally {
        setLoading(false);
      }
    };
    updateTaskStatus();
  }, [isComplete]);

  const onCheckTask = async (e: React.MouseEvent) => {
    e.preventDefault();
    isComplete ? setIsComplete(0) : setIsComplete(1);
  };

  return (
    <>
      {error && (
        <ErrorModal
          onConfirm={() => setError('')}
          title={'Invalid task delete'}
          message={error}
        />
      )}
      {loading && <Spinner />}
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
              type="text"
              maxLength={55}
              value={editTaskValue}
              onChange={(e) => setEditTaskValue(e.target.value)}
            />
            <FontAwesomeIcon className="pen" icon={faPen} onClick={editTask} />
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
              onClick={() => setIsEditing(true)}
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
