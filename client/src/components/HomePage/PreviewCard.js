import React from 'react';
import Rating from '@material-ui/lab/Rating';
import classes from './css/PreviewCard.module.css';

import Avatar from '../shared/Avatar';

const PreviewCard = props => {
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span key={`preview-lang-${index}`}>{lang}, </span> : <span key={`preview-lang-${index}`}>{lang}</span>
    )

    return (
        <div className={classes.PreviewCard}>
            <div className={classes.avatar}>
                <Avatar name={props.name} avatar={props.avatar} size={15} />
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
                    <Rating value={props.rating} precision={0.5} readOnly />
                </div>
            </div>
        </div>
    )
}

export default PreviewCard;
