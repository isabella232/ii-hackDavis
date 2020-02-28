import React from 'react';
import classes from './EventCard.module.css';

import Button from '../../shared/Button/Button';

const EventCard = (props) => {
    return (
        <div className={classes.EventCard}>
            <div className={classes.header}>
                <div className={classes.eventTitle}>{props.title}</div>
                {props.date} {props.time}
            </div>
            <p>Bacon ipsum dolor amet tri-tip beef cupim frankfurter pork belly, bacon pork chop jerky ground round ribeye corned beef. Drumstick short ribs sausage burgdoggen ham. Chuck capicola beef pastrami. Spare ribs cupim tail tri-tip burgdoggen. T-bone pork jerky ribeye, bacon leberkas tongue. Pork chop jerky cow, landjaeger shank corned beef meatball pork loin tail. Biltong short loin doner leberkas jerky landjaeger tongue, shankle t-bone meatloaf chuck.</p>
            <div className={classes.footer}>
                {props.past ? <Button content='Delete' inverted /> : null}
                <Button content='Edit' />
            </div>
        </div>
    )
}

export default EventCard;

