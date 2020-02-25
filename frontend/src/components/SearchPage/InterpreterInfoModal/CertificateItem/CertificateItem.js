import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import classes from './CertificateItem.module.css';

import CertificateModal from '../../CertificateModal/CertificateModal';

const CertificateItem = props => {
    return (
        <div className={classes.CertificateItem}>
            <div className={classes.header}>
                <div className={classes.title}>{props.title}</div>
                {props.isValidated ? <CheckCircleIcon /> : null}
            </div>
            <CertificateModal image={props.image} />
        </div>
    )
}

export default CertificateItem;
