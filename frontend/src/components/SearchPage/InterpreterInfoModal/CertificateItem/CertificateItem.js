import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import classes from './CertificateItem.module.css';

const CertificateItem = props => {
    return (
        <div className={classes.CertificateItem}>
            <div className={classes.title}>{props.title}</div>
            {props.isValidated}
            {props.isValidated ? <CheckCircleIcon /> : null}
        </div>
    )
}

export default CertificateItem;
