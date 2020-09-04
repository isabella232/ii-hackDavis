import React from 'react';
import classes from './css/Card.module.css';

const Card = (props) => (
    <div className={classes.Card}>
        {props.content}
    </div>
)

export default Card;
