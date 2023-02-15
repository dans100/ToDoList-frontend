import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {TaskEntity} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";
import {apiURL} from "../../config/api";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";


interface Props {
    task: TaskEntity;
    index: number;
    onChangeList: () => void;

}

export const TodoTableRow = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const {task, id} = props.task;
    const token = Cookies.get('access_token');

    const deleteTask = async (e: React.MouseEvent) => {

        if (!window.confirm(`Are you sure to delete task of id ${props.index + 1}`)) {
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`${apiURL}/list/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });
            props.onChangeList();
            await res.json();
        } catch (e) {
            setError('Error occurred on server on task delete');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && <ErrorModal onConfirm={()=> setError('')} title={'Invalid task delete'} message={error}/>}
            {loading && <Spinner/>}
            <tr className='line'>
                <td className='id'>{props.index + 1}</td>
                <td className='title'>{task}<FontAwesomeIcon icon={faTrash} onClick={deleteTask}/></td>
            </tr>
        </>
    )
}

