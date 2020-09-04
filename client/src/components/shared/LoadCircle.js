import React from 'react';
import classes from './css/LoadCircle.module.css';

import CircularProgress from '@material-ui/core/CircularProgress';

const LoadCircle = (props) => (props.open ?
    <div className={classes.Container}>
        <CircularProgress color="primary" />
    </div> : null
)

export default LoadCircle;
