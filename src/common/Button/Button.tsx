import React, {ReactNode} from 'react';

interface Props {
    className: string;
    type: "button" | "submit" | "reset" | undefined;
    onClick: () => void;
    children: ReactNode;
}

export const Button = (props:Props) => {
    return (
        <button
            className={props.className}
            type={props.type || 'button'}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

