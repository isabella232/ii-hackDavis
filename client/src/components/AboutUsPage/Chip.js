import React from 'react';

import classes from './css/Chip.module.css';

import Avatar from '../shared/Avatar';

const RoundPaper = (props) => {
    return <div className={classes.RoundPaper} onClick={e => props.click(props.index)}>
        <div className={classes.outer}>
            <div className={classes.inner}>
                <div className={classes.wrapper}>
                    <Avatar name={props.name} size={14}
                        avatar={props.avatar} />
                </div>
            </div>
        </div>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.position}>CEO</div>
    </div>;
}

export default RoundPaper;
