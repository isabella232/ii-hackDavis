import React from 'react';
import classes from './css/Paper.module.css';

const Paper = (props) => {
    let classNamePaper = classes.Paper;

    if (props.inverted) {
        classNamePaper = classes.invertedPaper;
    } else if (props.bio) {
        classNamePaper = classes.lightPaper;
    }

    return <div className={classNamePaper}>{props.children}</div>;
}

export default Paper;
