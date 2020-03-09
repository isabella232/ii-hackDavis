import React from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from './EventModal.module.css';

import Button from '../../shared/Button/Button';

const DeleteModal = props => {

    return (
        <>
            <Button content={'Delete'} delete click={props.clickDelete} />

            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.reviewEditor}>
                        <div className={classes.title}>{header}</div>
                        <form enctype="multipart/form-data">
                            <TextField label="Title"
                                name="title"
                                required
                                value={this.state.title}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                            <DateTimePicker pickDate={this.pickDate} initialVal={this.state.date} />
                            <TextField label="Location"
                                name="location"
                                required
                                margin="dense"
                                value={this.state.location}
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                            <TextField label="Summary"
                                name="summary"
                                required
                                margin="dense"
                                value={this.state.summary}
                                fullWidth
                                multiline
                                rows="5"
                                variant="outlined"
                                onChange={this.changeInput} />

                            <FilePond ref={ref => (this.pond = ref)}
                                allowMultiple={false}
                                onupdatefiles={fileItems => this.fileUpload(fileItems)} />

                            <div className={classes.buttons}>
                                <Button content={'Cancel'} inverted click={this.closeModal} />
                                <Button content={'Submit'} click={this.submitForm} />
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default DeleteModal;
