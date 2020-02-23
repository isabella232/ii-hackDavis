import React, { Component } from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import classes from './ReviewModal.module.css';

import Button from '../../shared/Button/Button';

import { submitReview } from '../../../services/InterpreterService';

class ReviewModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            userName: props.userName,
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
        if (!this.state.rating || this.state.comment === '') {
            alert(`Please fill out your rating and comment for ${this.props.name} before posting.`)
        } else {
            const data = {
                name: this.state.userName,
                rating: this.state.rating,
                comment: this.state.comment
            }
            submitReview(this.state.id, data)
                .then(data => {
                    alert('Successfully posted a review!');
                    this.closeModal();
                })
                .catch(e => {
                    alert("Your review cannot be posted at this time.");
                    this.closeModal();
                    console.log(e)
                });
        }
    }

    render() {
        return (
            <>
                <Button content={'Leave a Review'} click={this.writeReview} />

                <Modal className={classes.Modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 200 }}>
                    <Fade in={this.state.open}>
                        <div className={classes.reviewEditor}>
                            <div className={classes.title}>Review for {this.props.name}</div>
                            <Rating name='simple-controlled' value={this.state.rating} onChange={(event, newValue) => { this.setState({ rating: newValue }) }} />
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

export default ReviewModal;
