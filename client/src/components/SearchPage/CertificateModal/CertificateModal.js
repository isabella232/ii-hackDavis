import React from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from '@material-ui/core/styles';
import classes from './CertificateModal.module.css';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));


const CertificationModal = props => {
    const modalClasses = useStyles();
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };
    return (
        <div className={classes.CertificateModal}>
            <div className={classes.viewDocument} onClick={openModal}>View Document</div>
            <Modal className={modalClasses.modal}
                open={open}
                onClose={closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={open}>
                    <img src={props.image} height='60%' />
                </Fade>
            </Modal>
        </div>
    )
}

export default CertificationModal;

