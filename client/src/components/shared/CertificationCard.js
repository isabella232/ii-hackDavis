import React, { useState } from 'react';
import { withSnackbar } from 'notistack';

import classes from './css/CertificationCard.module.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import Button from './Button';
import DeleteModal from './DoubleCheckModal';

import { validateCertificate, rejectCertificate } from '../../services/AdminService';

const CertificationCard = (props) => {
    const [expand, setExpand] = useState(false);
    const [verified, setVerified] = useState(false);
    const [rejected, setRejected] = useState(false);
    const certificateClass = expand ? classes.expand : classes.collapse;
    const id = props.id;

    const verifyClicked = () => {
        validateCertificate(id)
            .then(() => {
                setVerified(true)
            }).catch(error => {
                props.enqueueSnackbar("Certificate cannot be validated at this time.", { variant: 'error' });
            })
    }

    const rejectClicked = () => {
        rejectCertificate(id)
            .then(() => {
                setRejected(true)
            }).catch(error => {
                props.enqueueSnackbar("Certificate cannot be rejected at this time.", { variant: 'error' });
            })
    }

    return (
        (!verified && !rejected) ? <div className={classes.CertificationCard}>
            <div className={classes.header}>
                <div className={classes.title}>
                    <strong>{props.title}</strong>
                    {props.isValidated ?
                        <CheckCircleIcon className={classes.checkIcon}
                            fontSize="small" color="primary" />
                        : null}
                    {props.isRejected ?
                        <CancelIcon className={classes.checkIcon}
                            fontSize="small" color="error" />
                        : null}
                </div>

                {expand ?
                    <IconButton size="small" color="primary" onClick={() => setExpand(false)}>
                        <ExpandLessIcon />
                    </IconButton>
                    : <IconButton size="small" color="primary" onClick={() => setExpand(true)}>
                        <ExpandMoreIcon />
                    </IconButton>}
            </div>

            <div className={certificateClass}>
                <img alt={`${props.title} Certificate`} src={props.img} width='100%' />

                <div className={classes.buttons}>
                    {!props.interpreter ? <div className={classes.footer}>
                        <Button content='Reject' invertedDelete click={rejectClicked} />
                        <Button content='Verify' click={verifyClicked} />
                    </div>
                        : <DeleteModal clickDelete={props.deleteCertificate} id={props.id}
                            content={`Are You Sure You Want To Delete ${props.title}?`} />}
                </div>
            </div>


        </div> : null
    )
}

export default withSnackbar(CertificationCard);
