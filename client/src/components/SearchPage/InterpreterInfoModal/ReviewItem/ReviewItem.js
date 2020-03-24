import React from 'react';
import Rating from '@material-ui/lab/Rating/Rating';
import classes from './ReviewItem.module.css';

const Review = (props) => {
    const date = new Date(props.date);
    const parsedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
        <div className={classes.Review}>
            <div className={classes.header}>
                <div><Rating value={props.rating} readOnly /></div>
                <div><emphasize>{parsedDate}</emphasize></div>
            </div>
            <div className={classes.comment}>
                <em>"{props.comment}"</em>
            </div>
            <div className={classes.userName}>
                <strong>- {props.reviewerName}</strong>
            </div>
        </div>
    )
}

export default Review;
