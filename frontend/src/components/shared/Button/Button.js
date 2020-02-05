import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
    return (
        (props.inverted) ?
            <div className={classes.inverted} onClick={props.click}>{props.content}</div>
            : <div className={classes.Button} onClick={props.click}>{props.content}</div>
    )
}

export default Button;
