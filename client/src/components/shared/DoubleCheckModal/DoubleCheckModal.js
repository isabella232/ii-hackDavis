import React from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from './DoubleCheckModal.module.css';

import Button from '../Button/Button';

const DeleteModal = props => {
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    const answerYes = () => {
        if (props.id) {
            props.clickDelete(props.id);
        } else {
            props.clickDelete();
        }
        closeModal();
    }

    return (
        <>
            <Button content={'Delete'} invertedDelete click={openModal} />

            <Modal className={classes.Modal}
                open={open}
                onClose={closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={open}>
                    <div className={classes.Box}>
                        <h3>{props.content}</h3>
                        <div className={classes.choices}>
                            <Button content={'Yes'} delete click={answerYes} />
                            <Button content={'Cancel'} inverted click={closeModal} />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DeleteModal;
