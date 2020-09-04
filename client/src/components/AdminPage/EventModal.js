import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import classes from './css/EventModal.module.css';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Button from '../shared/Button';
import DateTimePicker from '../shared/DateTimePicker';
import FileUploader from '../shared/FileUploader';

import { createEvent, editEvent } from '../../services/AdminService';

class EventModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            title: props.title,
            summary: props.summary,
            location: props.location,
            date: props.date,
            image: null,
            target: props.target
        }

        this.closeModal = this.closeModal.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.changeTarget = this.changeTarget.bind(this);
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

    changeTarget = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.setState({ target: e.target.value });
    }

    clearAllFields = () => {
        this.setState({
            id: this.props.id,
            title: this.props.title,
            summary: this.props.summary,
            location: this.props.location,
            date: this.props.date,
            image: null,
            target: this.props.target
        });
    }

    submitForm = async () => {
        if (!this.state.title) {
            this.props.enqueueSnackbar(`Please fill out the event's title.`, { variant: 'info' });
        } else if (!this.state.summary) {
            this.props.enqueueSnackbar(`Please fill out the event's summary.`, { variant: 'info' });
        } else if (!this.state.location) {
            this.props.enqueueSnackbar(`Please fill out the event's location.`, { variant: 'info' });
        } else if (!this.state.date) {
            this.props.enqueueSnackbar(`Please fill out the event's date.`, { variant: 'info' });
        } else if (!this.props.edit && !this.state.image) {
            this.props.enqueueSnackbar(`Please upload the event's image.`, { variant: 'info' });
        } else if (this.props.target === '') {
            this.props.enqueueSnackbar(`Please choose a scale of publication.`, { variant: 'info' });
        } else {
            const data = {
                title: this.state.title,
                summary: this.state.summary,
                location: this.state.location,
                date: this.state.date,
                image: this.state.image,
                target: this.state.target
            }
            try {
                if (!this.props.edit) {
                    await createEvent(data);
                } else {
                    await editEvent(this.state.id, data);
                }

                this.props.reloadData();
                if (this.props.create) {
                    this.clearAllFields();
                }
                this.closeModal();
            }
            catch (e) {
                this.props.enqueueSnackbar("Event cannot be create/edit at this time.", { variant: 'error' });
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
                            <TextField label="Title"
                                name="title"
                                required
                                value={this.state.title}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                            <DateTimePicker pickDate={this.pickDate} initialVal={this.state.date} />
                            <div className={classes.label}>Scale of Publishment</div>
                            <RadioGroup aria-label="target" name={'target'} value={this.state.target} onChange={this.changeTarget}>
                                <div className={classes.targetArea}>
                                    <FormControlLabel value="Interpreters Only" control={<Radio checked={this.state.target === 'Interpreters Only'} color="primary" />} label="Interpreters Only" />
                                    <FormControlLabel value="Clients Only" control={<Radio checked={this.state.target === 'Clients Only'} color="primary" />} label="Clients Only" />
                                    <FormControlLabel value="Everyone" control={<Radio checked={this.state.target === 'Everyone'} color="primary" />} label="Everyone" />
                                </div>
                            </RadioGroup>
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

                            <FileUploader label="Cover Image" upload={this.fileUpload} />

                            <div className={classes.buttons}>
                                <Button content={'Cancel'} inverted click={this.closeModal} />
                                <Button content={'Submit'} click={this.submitForm} />
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}

export default withSnackbar(EventModal);
