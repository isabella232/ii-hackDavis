import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    let buttonClass = classes.Button;
    if (props.delete) {
        buttonClass = classes.delete;
    }
    if (props.inverted) {
        buttonClass = classes.inverted;
    }

    return (
        <div className={buttonClass} onClick={props.click}>{props.content}</div>
    )
}

export default Button;
