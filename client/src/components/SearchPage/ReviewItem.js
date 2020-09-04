import React from 'react';
import classes from './css/ReviewItem.module.css';

import Rating from '@material-ui/lab/Rating/Rating';

const ReviewItem = (props) => {
    const date = new Date(props.date);
    const parsedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
        <div className={classes.ReviewItem}>
            <div className={classes.header}>
                <div><Rating size="small" value={props.rating} readOnly /></div>
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

export default ReviewItem;
