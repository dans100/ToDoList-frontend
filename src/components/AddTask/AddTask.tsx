import React, {FormEvent, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp} from '@fortawesome/free-solid-svg-icons';
import {TaskCreate} from "types";
import {Spinner} from "../../common/Spinner/Spinner";
import Cookies from "js-cookie";
import {apiURL} from "../../config/api";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";
import {useNavigate} from "react-router-dom";

interface Props {
    onChangeList: () => void;
}


export const AddTask = (props: Props) => {

    const [task, setTask] = useState<TaskCreate>({
        description: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const token = Cookies.get('access_token');
    const navigate = useNavigate();

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        if(task.description.length < 3 || task.description.length > 55) {
            setError('Task cannot be shorter than 3 characters and later than 55 characters');
            return;
        }
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
            if (res.status === 401) {
                navigate('/');
            } else {
                props.onChangeList();
                await res.json();
            }

        } catch (e) {
            setError('Error occurred on server on task add')
        }
        finally {
            setLoading(false);
        }

        setTask({
            description: '',
        });
    }

    return (
        <>
            {error && <ErrorModal onConfirm={() => setError('')} title='Invalid task add' message={error}/>}
            {loading && <Spinner/>}
            <form onSubmit={sendForm}>
                <input
                    type="text"
                    placeholder="Add task"
                    value={task.description}
                    maxLength={55}
                    onChange={e => setTask({
                        ...task,
                        description: e.target.value
                    })}
                />
                <button type="submit" className='submit'><FontAwesomeIcon icon={faCircleUp}/></button>
            </form>
        </>
    )
}

