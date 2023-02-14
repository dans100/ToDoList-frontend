import React, {FormEvent, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp} from '@fortawesome/free-solid-svg-icons';
import {TaskCreate} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";
import {apiURL} from "../../config/api";

interface Props {
    onChangeList: () => void;
}


export const AddTask = (props: Props) => {

    const [task, setTask] = useState<TaskCreate>({
        task: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const token = Cookies.get('access_token');

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${apiURL}/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(task),
                credentials: 'include',
            })
            props.onChangeList();
            await res.json();

        } finally {
            setLoading(false);
        }
    }
    if (loading) {

        return (<>
                <Spinner/>
            </>
        )
    }

    return (

        <form onSubmit={sendForm}>
            <input
                type="text"
                placeholder="Add task"
                value={task.task}
                onChange={e => setTask({
                    ...task,
                    task: e.target.value
                })}
            />
            <button type="submit" className='submit'><FontAwesomeIcon icon={faCircleUp}/></button>
        </form>


    )
}
