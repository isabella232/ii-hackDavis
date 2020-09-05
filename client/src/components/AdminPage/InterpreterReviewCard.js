import React from 'react';

import classes from './css/InterpreterReviewCard.module.css';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import Avatar from '../shared/Avatar';
import Button from '../shared/Button';
import Paper from '../shared/Paper';
import CertificationCard from '../shared/CertificationCard';
import DeleteModal from '../shared/DoubleCheckModal';
import InfoModal from '../SearchPage/InterpreterInfoModal';

const InterpreterReviewCard = (props) => {
    const deleteInterpreter = () => {
        props.clickDelete(props.email);
    }

    return (
        <Paper>
            <div className={classes.InterpreterReviewCard}>
                <div className={classes.header}>
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

                    {!props.isRejected ?
                        <Button content="Reject" id={props.id} invertedDelete
                            click={props.clickReject} />
                        : null}
                    {!props.isVerified ?
                        <Button content="Verify" id={props.id}
                            click={props.clickVerify} />
                        : null}
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

                <div className={classes.bottom}>
                    <InfoModal key={`more-info-${props.id}`} id={props.id}
                        name={props.name}
                        avatar={props.avatar}
                        services={props.services}
                        email={props.email}
                        location={props.location}
                        phone={props.phone}
                        summary={props.summary}
                        languages={props.languages}
                        fromAdminPage
                        isRejected={props.isRejected}
                        isVerified={props.isVerified} />

                    <div className={classes.deleteButton}>
                        <DeleteModal content={'Are You Sure You Want To Permanently Delete This Interpreter\'s Account?'}
                            account clickDelete={deleteInterpreter} />
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default InterpreterReviewCard;
