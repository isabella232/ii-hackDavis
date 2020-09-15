import React from 'react';

import classes from './css/Chip.module.css';

import Avatar from '../shared/Avatar';

const RoundPaper = (props) => {
    return <div className={classes.RoundPaper} onClick={e => props.click(props.index)}>
        <div className={props.active ? classes.outerActive : classes.outer}>
            <div className={props.active ? classes.innerActive : classes.inner}>
                <div className={props.active ? classes.wrapperActive : classes.wrapper}>
                    <Avatar name={props.name} size={14}
                        avatar={props.avatar} />
                </div>
            </div>
        </div>
        <div className={props.active ? classes.nameActive : classes.name}>{props.name}</div>
    </div>;
}

export default RoundPaper;
