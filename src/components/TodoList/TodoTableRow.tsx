import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {TaskEntity} from "types";
import {Spinner} from "../../common/Spinner/Spinner";


interface Props {
    task: TaskEntity;
    index: number;
    onChangeList: () => void;

}

export const TodoTableRow = (props: Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const {task, id} = props.task;

    const deleteTask = async (e: React.MouseEvent) => {

        if (!window.confirm(`Czy napewno chcesz usunąć zadanie nr ${props.index + 1}`)) {
            return;
        }
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:3001/list/${id}`, {
                method: 'DELETE'
            });
            setLoading(false);
            props.onChangeList();
            await res.json();
        } catch (err) {
            console.error('Wystąpił błąd podczas dodawania zadania:', err);
        }
    }
    if (loading) {
        return <Spinner/>
    }

    return (
        <tr>
            <td className='id'>{props.index + 1}</td>
            <td className='title'>{task}<FontAwesomeIcon icon={faTrash} onClick={deleteTask}/></td>
        </tr>
    )
}

