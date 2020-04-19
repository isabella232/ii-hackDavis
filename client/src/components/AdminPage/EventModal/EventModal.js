import React, { Component } from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from './EventModal.module.css';
import TextField from '@material-ui/core/TextField';
import Button from '../../shared/Button/Button';
import DateTimePicker from '../../shared/DateTimePicker/DateTimePicker';
import FileUploader from '../../shared/FileUploader/FileUploader';

import { createEvent, editEvent } from '../../../services/AdminService';

class ReviewModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            title: props.title,
            summary: props.summary,
            location: props.location,
            date: props.date,
            image: null
        }

        this.closeModal = this.closeModal.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    pickDate = (date) => {
        this.setState({ date: date });
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = async () => {
        if (!this.state.title) {
            alert(`Please fill out the event's title.`);
        } else if (!this.state.summary) {
            alert(`Please fill out the event's summary.`);
        } else if (!this.state.location) {
            alert(`Please fill out the event's location.`);
        } else if (!this.state.date) {
            alert(`Please fill out the event's date.`);
        } else if (!this.props.edit && !this.state.image) {
            alert(`Please upload the event's image.`);
        } else {
            const data = {
                title: this.state.title,
                summary: this.state.summary,
                location: this.state.location,
                date: this.state.date,
                image: this.state.image
            }
            try {
                if (!this.props.edit) {
                    await createEvent(data);
                } else {
                    await editEvent(this.state.id, data);
                }

                this.props.reloadData();
                this.closeModal();
            }
            catch (e) {
                alert("Your event cannot be created/edited at this time.");
                this.closeModal();
                console.log(e)
            };

        }
    }

    fileUpload = (fileItem) => {
        this.setState({ image: fileItem });
    }

    render() {
        const button = (this.props.edit) ?
            <Button content={'Edit'} click={this.openModal} />
            : <Button content={'Create Event'} click={this.openModal} />;
        const header = (this.props.edit) ?
            <span>Edit Selected Event</span>
            : <span>Create A New Event</span>;

        return (
            <>
                {button}

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

                                <FileUploader upload={this.fileUpload} />

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
}

export default ReviewModal;
