import React from 'react';
import classes from './css/SlantedSection.module.css';

const SlantedSection = (props) => <div className={classes.SlantedSection}>
    <div className={classes.shape}>
        {props.children}
    </div>
    <div className={classes.shadowLight}></div>
    <div className={classes.shadowDark}></div>
</div >

export default SlantedSection;
