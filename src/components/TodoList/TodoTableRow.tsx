import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {TaskEntity} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";


interface Props {
    task: TaskEntity;
    index: number;
    onChangeList: () => void;

}

export const TodoTableRow = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const {task, id} = props.task;
    const token = Cookies.get('access_token');

    const deleteTask = async (e: React.MouseEvent) => {

        if (!window.confirm(`Are you sure to delete task of id ${props.index + 1}`)) {
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3001/list/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            setLoading(false);
            props.onChangeList();
            await res.json();
        } catch (e) {
            console.error(e);
        }
    }
    if (loading) {
        return <Spinner/>
    }

    return (
        <tr className='line'>
            <td className='id'>{props.index + 1}</td>
            <td className='title'>{task}<FontAwesomeIcon icon={faTrash} onClick={deleteTask}/></td>
        </tr>
    )
}

