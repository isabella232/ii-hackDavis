import React from 'react';

import classes from './css/UserTag.module.css';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Rating from '@material-ui/lab/Rating';

import Avatar from '../shared/Avatar';
import Paper from './Paper';

const UserTag = (props) => {
    let icon = null;

    if (props.admin) {
        icon = <AccountCircleIcon className={classes.icon} fontSize="small" />;
    } else if (props.interpreter) {
        if (props.isVerified) {
            icon = <CheckCircleIcon className={classes.icon} fontSize="small" />;
        } else if (props.isRejected) {
            icon = <CancelIcon className={classes.verifyIcon} fontSize="small" color="error" />;
        }
    }

    return (
        <Paper inverted>
            <div className={classes.UserTag}>
                <Avatar name={props.name} avatar={props.avatar} size={7} />

                <div>
                    <div className={classes.flexArea}>
                        <div className={classes.name}>{props.name}</div>
                        {icon}
                    </div>
                    {props.interpreter ? <Rating className={classes.rating}
                        size="small" value={props.rating}
                        precision={0.5} readOnly /> : null}
                </div>
            </div>
        </Paper>
    )
}

export default UserTag;
