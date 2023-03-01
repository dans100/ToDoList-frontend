import React, {useState} from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {apiURL} from "../../config/api";
import {Spinner} from "../../common/Spinner/Spinner";
import {ErrorModal} from "../../common/ErrorModal/ErrorModal";
import {Button} from "../../common/Button/Button";

interface Props {
    onChangeList: () => void;
}

export const DeleteAllComplete = (props:Props) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const token = Cookies.get('access_token');
    const navigate = useNavigate();


    const onDeleteComplete = async () => {

        if (!window.confirm(`Are you sure to clear complete tasks`)) {
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${apiURL}/list/complete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            })

            if (res.status === 401) {
                navigate('/');
            } else  {
                props.onChangeList();
            }
        } catch (e) {
            console.log(e);
            setError('Cannot delete complete tasks, try again later');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {loading && <Spinner/>}
            {error && <ErrorModal onConfirm={() => setError('')} title='Invalid delete'
                                  message={error}/>}
            <Button className='login' type='button' onClick={onDeleteComplete}>Clear Complete</Button>
        </>
    )

}
