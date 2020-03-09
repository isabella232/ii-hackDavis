import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    let buttonClass = classes.Button;
    if (props.inverted) {
        buttonClass = classes.inverted;
    }
    if (props.delete) {
        buttonClass = classes.delete;
    }

    return (
        <div className={buttonClass} onClick={props.click}>{props.content}</div>
    )
}

export default Button;
