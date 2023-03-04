import React from 'react';
import { TodoTableRow } from './TodoTableRow';
import { AddTask } from '../AddTask/AddTask';
import { TaskEntity } from 'types';
import { DeleteAllTask } from '../DeleteAllTask/DeleteAllTask';
import { DeleteAllComplete } from '../DeleteAllTask/DeleteAllComplete';
import './TodoTable.css';

interface Props {
  list: TaskEntity[];
  onChangeList: () => void;
}

export const TodoTable = (props: Props) => {
  return (
    <table className="table">
      <thead className="box">
        <tr className="line">
          <th className="id">Status</th>
          <th className="title">Title</th>
        </tr>
      </thead>
      <tbody className="box">
        {props.list.map((task, index) => (
          <TodoTableRow
            task={task}
            index={index}
            key={task.id}
            onChangeList={props.onChangeList}
          />
        ))}
        <tr className="line">
          <td className="form">
            <AddTask onChangeList={props.onChangeList} />
          </td>
        </tr>
        <DeleteAllTask onChangeList={props.onChangeList} />
        <DeleteAllComplete onChangeList={props.onChangeList} />
      </tbody>
    </table>
  );
};
