import React from 'react';

import classes from './css/InterpreterReviewCard.module.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import Paper from '../shared/Paper';
import CertificationCard from '../shared/CertificationCard';

const InterpreterReviewCard = (props) => {

    return (
        <Paper>
            <div className={classes.InterpreterReviewCard}>
                <div className={classes.flexArea}>
                    <Avatar name={props.name} avatar={props.avatar} size={7} />
                    <div>
                        <div className={classes.infoItem}>
                            <strong>{props.name}</strong>
                            {props.isVerified ? <CheckCircleIcon className={classes.icon}
                                fontSize="small" color="primary" /> : null}
                            {props.isRejected ? <CancelIcon className={classes.icon}
                                fontSize="small" color="error" /> : null}
                        </div>
                        <div className={classes.infoItem}>
                            {props.location}
                        </div>
                    </div>
                </div>

                <div>
                    {!props.isRejected ?
                        <Button content="Reject" id={props.id} invertedDelete
                            click={props.clickReject} />
                        : null}
                    {!props.isVerified ?
                        <Button content="Verify" id={props.id}
                            click={props.clickVerify} />
                        : null}
                </div>
            </div>
            {props.unvalidatedCertificates.map(certificate => (
                <CertificationCard key={`${certificate.id}`}
                    id={certificate.id}
                    avatar={props.avatar}
                    name={props.name}
                    title={certificate.title}
                    location={props.location}
                    img={certificate.image} />
            ))}
        </Paper>
    )
}

export default InterpreterReviewCard;
