import React from 'react';
import {TodoTableRow} from "./TodoTableRow";
import {AddTask} from "../AddTask/AddTask";
import {TaskEntity} from 'types';


interface Props {
    list: TaskEntity[];
    onChangeList: () => void;

}

export const TodoTable = (props: Props) => {
    return (
        <table>
            <thead>
            <tr>
                <th className='id'>Lp</th>
                <th className='title'>Tytuł</th>
            </tr>
            </thead>
            <tbody>
            {props.list.map((task, index) => <TodoTableRow task={task} index={index} key={task.id} onChangeList={props.onChangeList}/>)}
            <tr>
                <td className="form"><AddTask onChangeList={props.onChangeList}/></td>
            </tr>
            </tbody>
        </table>
    )
}
