import React from 'react';
import classes from './EventCard.module.css';

import Button from '../../shared/Button/Button';

const EventCard = (props) => {
    return (
        <div className={classes.EventCard}>
            <div className={props.past ? classes.past : null}>
                <div className={classes.header}>
                    <div className={classes.eventTitle}>{props.title}</div>
                    {props.date} {props.time}
                </div>
                <p>{props.summary}</p>
                <img src={props.image} alt={`${props.title} on ${props.date}`} height={'100%'} />
                <div className={classes.footer}>
                    {!props.past ? (
                        <>
                            <Button content='Delete' inverted />
                            <Button content='Edit' />
                        </>
                    ) : null}

                </div>
            </div>
        </div>
    )
}

export default EventCard;

