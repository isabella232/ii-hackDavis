import React, { useState } from 'react';
import classes from './CertificationCard.module.css';

import Avatar from '../../shared/Avatar/Avatar';
import Button from '../../shared/Button/Button';

const CertificationCard = (props) => {
    const [expand, setExpand] = useState(false);
    const certificateClass = expand ? classes.expand : classes.collapse;

    return (
        <div className={classes.CertificationCard}>
            <div className={classes.header}>
                <div className={classes.userInfo}>
                    <Avatar name={props.name} avatar={props.avatar} size={7} />

                    <div>
                        <div className={classes.infoItem}>
                            <strong>{props.name}</strong>
                        </div>
                        <div className={classes.infoItem}>
                            {props.location}
                        </div>
                    </div>
                </div>

                {expand ? <Button content='Collapse Document' inverted click={() => setExpand(false)} />
                    : <Button content='Expand Document' inverted click={() => setExpand(true)} />}
            </div>

            <div className={certificateClass}>
                <img src='https://www.westonearthimages.com/images/slide/ea0063-1400-x-600.jpg' width='100%' />

                <div className={classes.footer}>
                    <Button content='Reject' inverted />
                    <Button content='Verify' />
                </div>
            </div>
        </div>
    )
}

export default CertificationCard;
