import React, { useState } from 'react';
import classes from './CertificationCard.module.css';

import Avatar from '../../shared/Avatar/Avatar';
import Button from '../../shared/Button/Button';

import { verifyCertificate, rejectCertificate } from '../../../services/AdminService';
import { bufferToImg } from '../../../services/ImageService';

const CertificationCard = (props) => {
    const [expand, setExpand] = useState(false);
    const [verified, setVerified] = useState(false);
    const [rejected, setRejected] = useState(false);
    const [imgsrc, setImgsrc] = useState(bufferToImg(props.file));
    const certificateClass = expand ? classes.expand : classes.collapse;
    const id = props.id;

    const verifyClicked = () => {
        verifyCertificate(id)
            .then(() => {
                setVerified(true)
            }).catch(error => {
                console.log(error)
                alert("Error: Can't verify certificate")
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
                <div className={classes.userInfo}>
                    <Avatar name={props.name} avatar={props.avatar} size={7} />

                    <div>
                        <div className={classes.infoItem}>
                            <strong>{props.name}</strong>
                        </div>
                        <div className={classes.infoItem}>
                            {props.location}
                        </div>
                    </div>
                </div>

                <strong>{props.title}</strong>

                {expand ? <Button content='Collapse Document' inverted click={() => setExpand(false)} />
                    : <Button content='Expand Document' inverted click={() => setExpand(true)} />}
            </div>

            <div className={certificateClass}>
                <img alt={`${props.name}Avatar`} src='https://www.westonearthimages.com/images/slide/ea0063-1400-x-600.jpg' width='100%' />

                {/* change later */}
                {/* <img src={imgsrc} alt={`${props.name}Avatar`} width='100%' /> */}

                <div className={classes.footer}>
                    <Button content='Reject' inverted click={rejectClicked} />
                    <Button content='Verify' click={verifyClicked} />
                </div>
            </div>
        </div> : null
    )
}

export default CertificationCard;
