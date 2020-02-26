import React from 'react';
import classes from './PreviewCard.module.css';

const PreviewCard = props => {
    const languages = props.languages.map((lang, index) =>
        (index !== props.languages.length - 1) ? <span>{lang}, </span> : <span>{lang}</span>
    )

    return (
        <div className={classes.PreviewCard}>
            <div className={classes.avatar}>
                <img src={props.avatar} width='100%' />
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

                more info
            </div>
        </div>
    )
}

export default PreviewCard;
