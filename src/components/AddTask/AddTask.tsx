import React, {FormEvent, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp} from '@fortawesome/free-solid-svg-icons';
import {TaskCreate} from "types";
import {Spinner} from "../../common/Spinner/Spinner";

interface Props {
    onChangeList: () => void;
}


export const AddTask = (props: Props) => {

    const [task, setTask] = useState<TaskCreate>({
        task: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const sendForm = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(task),
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
                placeholder="Dodaj zadanie"
                value={task.task}
                onChange={e => setTask({
                    ...task,
                    task: e.target.value
                })}
            />
            <button type="submit"><FontAwesomeIcon icon={faCircleUp}/></button>
        </form>


    )
}
