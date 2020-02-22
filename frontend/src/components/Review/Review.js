import React from 'react';
import Rating from '@material-ui/lab/Rating/Rating';
import classes from './Review.module.css';

const Review = (props) => {
    return (
        <div className={classes.Review}>
            <Rating value={props.rating} readOnly />
            <div className={classes.comment}>
                <em>"{props.comment}"</em>
            </div>
            <div className={classes.userName}>
                <strong>- {props.userName}</strong>
            </div>
        </div>
    )
}

export default Review;
