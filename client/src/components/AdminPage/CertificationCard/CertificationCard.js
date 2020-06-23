import React, { useState } from 'react';
import classes from './CertificationCard.module.css';

import Avatar from '../../shared/Avatar/Avatar';
import Button from '../../shared/Button/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { validateCertificate, rejectCertificate } from '../../../services/AdminService';

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
                console.log(error)
                alert("Error: Can't validate certificate")
            })
    }

    const rejectClicked = () => {
        rejectCertificate(id)
            .then(() => {
                setRejected(true)
            }).catch(error => {
                console.log(error)
                alert("Error: Can't reject certificate")
            })
    }

    return (
        (!verified && !rejected) ? <div className={classes.CertificationCard}>
            <div className={classes.header}>

                {!props.interpreter ? <div className={classes.userInfo}>
                    <Avatar name={props.name} avatar={props.avatar} size={7} />

                    <div>
                        <div className={classes.infoItem}>
                            <strong>{props.name}</strong>
                        </div>
                        <div className={classes.infoItem}>
                            {props.location}
                        </div>
                    </div>
                </div> : null}


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

                {expand ? <Button content='Close' inverted click={() => setExpand(false)} />
                    : <Button content='Expand' inverted click={() => setExpand(true)} />}
            </div>

            <div className={certificateClass}>
                <img alt={`${props.title} Certificate`} src={props.certificateImage} width='100%' />
                {!props.interpreter ? <div className={classes.footer}>
                    <Button content='Reject' inverted click={rejectClicked} />
                    <Button content='Verify' click={verifyClicked} />
                </div> : null}
            </div>
        </div> : null
    )
}

export default CertificationCard;
