import React from "react";
import ReactDOM from "react-dom";
import {Button} from "../Button/Button";
import './ErrorModal.css';

interface Props {
    onConfirm: () => void;
    title: string;
    message: string;
}

const BackDrop = (props: Pick<Props, 'onConfirm'>) => (
    <div className="backdrop" onClick={props.onConfirm} />
);

const ModalOverlay = (props: Props) => {
    return (
        <div className="modal">
            <div className="modal-header">
                <h2>{props.title}</h2>
            </div>
            <div className="modal-content">
                <p>{props.message}</p>
            </div>
            <footer className="modal-actions">
                <Button className='confirm' type="submit" onClick={props.onConfirm}>OK</Button>
            </footer>
        </div>
    );
};

export const ErrorModal = (props: Props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <BackDrop onConfirm={props.onConfirm} />,
                document.getElementById("backdrop-root") as HTMLElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById("overlay-root") as HTMLElement
            )}
        </>
    );
};
