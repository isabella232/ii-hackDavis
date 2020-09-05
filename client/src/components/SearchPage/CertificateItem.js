import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import classes from './css/CertificateItem.module.css';

import IconButton from '@material-ui/core/IconButton/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import CertificateModal from './CertificateModal';

import { validateCertificate, rejectCertificate } from '../../services/AdminService';

const CertificateItem = props => {
    const [isRejected, setIsRejected] = useState(false);
    let icon = null;

    if (props.userKind === "Admin") {
        if (!isRejected) {
            icon = <IconButton size="small" onClick={e => clickReject(props.id)}>
                <CheckCircleIcon color="primary" />
            </IconButton>;
        } else {
            icon = <IconButton size="small" onClick={e => clickValidate(props.id)}>
                <CancelIcon color="error" />
            </IconButton>;
        }
    } else if (props.isValidated) {
        icon = <CheckCircleIcon color="primary" />;
    }

    const clickValidate = (id) => {
        validateCertificate(id)
            .then(data => props.enqueueSnackbar("Success! This certificate has been validated.", { variant: 'success' }))
            .catch(e => props.enqueueSnackbar("This certificate cannot be validated at this moment.", { variant: 'error' }));
        setIsRejected(!isRejected);
    }

    const clickReject = (id) => {
        rejectCertificate(id)
            .then(data => props.enqueueSnackbar("This certificate has been rejected.", { variant: 'info' }))
            .catch(e => props.enqueueSnackbar("This certificate canont be rejected at this moment.", { variant: 'error' }));
        setIsRejected(!isRejected);
    }

    return (
        <div className={classes.CertificateItem}>
            <div className={classes.header}>
                <div className={classes.title}>{props.title}</div>
                {icon}
            </div>
            <CertificateModal image={props.image} />
        </div>
    )
}

const mapStateToProps = state => ({
    userKind: state.userKind,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(withSnackbar(CertificateItem));
