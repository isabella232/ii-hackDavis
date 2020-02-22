import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import classes from './InterpreterInfoModal.module.css';

import Button from '../../shared/Button/Button';
import Review from '../../Review/Review';

import { fetchRatingAndReviews } from '../../../services/InterpreterService';

class InterpreterInfoModal extends Component {
    constructor(props) {
        super();
        this.state = {
            interpreterID: props.interpreterID,
            open: false,
            rating: 0,
            reviews: []
        };
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    expandDetails = () => {
        this.openModal();
        fetchRatingAndReviews(this.state.interpreterID)
            .then(data => {
                console.log(data)
                this.setState({
                    rating: data.rating,
                    reviews: data.reviews
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    submitRating = rating => {
        console.log('rate', rating)
    }

    render() {
        const languages = this.props.languages.map(lang => <div className={classes.language}>{lang.language}: {lang.fluency} </div>)
        const first = this.state.reviews[0] ? this.state.reviews[0] : null;
        const firstReview = first ?
            <Review userName={first.userName} rating={first.rating} comment={first.comment} />
            : `${this.props.name} Has No Reviews.`;
        const reviews = this.state.reviews.map(review => <Review userName={review.userName} rating={review.rating} comment={review.comment} />)

        return (
            <div>
                <div className={classes.moreInfo} onClick={this.expandDetails}>more info</div>

                <Modal className={classes.Modal}
                    open={this.state.open}
                    onClose={this.closeModal}
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 200 }}>
                    <Fade in={this.state.open}>
                        <div className={classes.infoCard}>
                            <Grid container spacing={2} justify='center'>
                                <Grid item xs={5} sm={5}>
                                    <div className={classes.avatar}>
                                        <img src={this.props.avatar} width='100%' />
                                    </div>
                                </Grid>

                                <Grid item xs={7} sm={7}>
                                    <div className={classes.title}>Your Interpreter</div>
                                    <div className={classes.name}>{this.props.name}</div>
                                    <div className={classes.infoItem}>
                                        <Rating value={this.state.rating} readOnly />
                                        {/* onChange={(e, newValue) => this.submitRating(newValue)} */}
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Email:</div>
                                        <div>{this.props.email}</div>
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Location:</div>
                                        <div>{this.props.location}</div>
                                    </div>
                                    <div className={classes.infoItem}>
                                        <div>Languages:
                                        <div>{languages}</div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            <div className={classes.horzLine} />

                            <Grid container spacing={2} justify='center'>
                                <Grid item xs={6}>
                                    <div className={classes.title}>Certifications:</div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={classes.title}>Reviews:
                                        <div className={classes.reviewArea}>{reviews}</div>

                                    </div>

                                    <div className={classes.reviewOptions}>
                                        {/* <Button inverted content={'View More'} /> */}
                                        <Button content={'Leave a Review'} />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            </div >
        );
    }
}

export default InterpreterInfoModal;
