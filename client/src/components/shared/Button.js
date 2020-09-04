import React from 'react';

import classes from './css/Button.module.css';

const Button = (props) => {
    let buttonClass = classes.Button;
    if (props.inverted) {
        buttonClass = classes.inverted;
    }
    if (props.delete) {
        buttonClass = classes.delete;
    }
    if (props.invertedDelete) {
        buttonClass = classes.invertedDelete;
    }

    return <div className={buttonClass} onClick={e => props.click(props.id)}>{props.content}</div>;
}

export default Button;
