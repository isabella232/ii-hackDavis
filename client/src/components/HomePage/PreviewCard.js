import React from 'react';
import Rating from '@material-ui/lab/Rating';
import classes from './PreviewCard.module.css';

import Avatar from '../shared/Avatar/Avatar';

const PreviewCard = props => {
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span>{lang}, </span> : <span>{lang}</span>
    )

    return (
        <div className={classes.PreviewCard}>
            <div className={classes.avatar}>
                <Avatar name={props.name} avatar={props.avatar} size={19} />
            </div>
            <div className={classes.content}>
                <div className={classes.name}>
                    {props.name}
                </div>
                <div className={classes.languages}>
                    {languages}
                </div>
                <div className={classes.email}>
                    {props.email}
                </div>
                <div className={classes.location}>
                    {props.location}
                </div>
                <div className={classes.rating}>
                    <Rating value={props.rating} readOnly />
                </div>
            </div>
        </div>
    )
}

export default PreviewCard;
