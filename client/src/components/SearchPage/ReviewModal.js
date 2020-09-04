import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Rating from '@material-ui/lab/Rating';
import classes from './css/ReviewModal.module.css';

import Button from '../shared/Button';

import { submitReview } from '../../services/InterpreterService';

class ReviewModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            userName: props.reviewerName,
            rating: 0,
            comment: ''
        }

        this.writeReview = this.writeReview.bind(this);
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    writeReview = () => {
        this.openModal();
    }

    postReview = () => {
        if (!this.state.rating) {
            this.props.enqueueSnackbar(`Please rate ${this.props.name}.`, { variant: 'info' })
        } else if (this.state.comment === '') {
            this.props.enqueueSnackbar(`Please fill out your comment for ${this.props.name}`, { variant: 'info' })
        } else {
            const data = {
                name: this.state.reviewerName,
                rating: this.state.rating,
                comment: this.state.comment
            }
            submitReview(this.state.id, data)
                .then(data => {
                    this.props.reloadDetails();
                    this.closeModal();
                })
                .catch(e => {
                    this.props.enqueueSnackbar("Your review cannot be posted at this time.", { variant: 'error' })
                    this.closeModal();
                    console.log(e)
                });
        }
    }

    render() {
        return (
            <>
                {(this.props.userKind !== 'Interpreter' && this.props.isLoggedIn) ?
                    <Button content={'Leave a Review'} click={this.writeReview} />
                    : null}

                <Modal className={classes.Modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 200 }}>
                    <Fade in={this.state.open}>
                        <div className={classes.reviewEditor}>
                            <div className={classes.title}>Review for {this.props.name}</div>
                            <Rating value={this.state.rating} onChange={(event, newValue) => { this.setState({ rating: newValue }) }} />
                            <textarea className={classes.comment} onChange={e => { this.setState({ comment: e.target.value }) }} />
                            <div className={classes.buttons}>
                                <Button content={'Post'} click={this.postReview} />
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => ({
    userKind: state.userKind,
    isLoggedIn: state.isLoggedIn
});

export default connect(mapStateToProps)(withSnackbar(ReviewModal));
