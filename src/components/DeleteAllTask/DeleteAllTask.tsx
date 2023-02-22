import React, {useState} from "react";
import {Button} from "../../common/Button/Button";
import {apiURL} from "../../config/api";
import Cookies from "js-cookie";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";
import {Spinner} from "../../common/Spinner/Spinner";
import {useNavigate} from "react-router-dom";

interface Props {
    onChangeList: () => void;
}

export const DeleteAllTask = (props: Props) => {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const token = Cookies.get('access_token');
    const navigate = useNavigate();


    const onDeleteAll = async () => {

        if (!window.confirm(`Are you sure to clear list`)) {
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${apiURL}/list`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            })

            if (res.status === 401) {
                navigate('/');
            } else {
                props.onChangeList();
                await res.json();
            }

        } catch (e) {
           console.log(e);
        } finally {
            setLoading(false);
        }

    }

    return (
        <>
            {loading && <Spinner/>}
            {error && <ErrorModal onConfirm={() => setError('')} title='Invalid delete'
                                  message='Cannot delete list, try again later'/>}
            <Button className='login' type='button' onClick={onDeleteAll}>Clear All</Button>
        </>
    )
}
