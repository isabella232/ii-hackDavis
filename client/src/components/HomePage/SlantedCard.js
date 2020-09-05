import React from 'react';
import classes from './css/SlantedCard.module.css';

const SlantedCard = (props) => <div className={classes.SlantedCard}>
    <div className={classes.shape}>
        <div className={classes.customerPicture}>
            <img src={props.src}
                alt={props.alt} />
        </div>
    </div>
    <div className={classes.shapeShadow}></div>
</div >

export default SlantedCard;
