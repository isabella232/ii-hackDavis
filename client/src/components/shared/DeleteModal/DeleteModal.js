import React from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from './DeleteModal.module.css';

import Button from '../../shared/Button/Button';

const DeleteModal = props => {
    const [open, setOpen] = React.useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button content={'Delete'} delete inverted click={openModal} />

            <Modal className={classes.Modal}
                open={open}
                onClose={closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={open}>
                    <div className={classes.Box}>
                        <h3>Are You Sure You Want To Delete This?</h3>
                        <div className={classes.choices}>
                            <Button content={'Yes'} delete click={props.clickDelete} />
                            <Button content={'Cancel'} click={closeModal} />
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DeleteModal;
