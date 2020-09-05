import React from 'react';
import classes from './css/Paper.module.css';

const Paper = (props) => {
    const classNamePaper = props.inverted ? classes.invertedPaper : classes.Paper;

    return <div className={classNamePaper}>{props.children}</div>;
}

export default Paper;
