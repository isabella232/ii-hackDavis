import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import classes from './InterpreterInfoModal.module.css';

import CertificationItem from '../CertificateItem/CertificateItem';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewModal from '../../ReviewModal/ReviewModal';

import { fetchRatingAndReviews } from '../../../../services/InterpreterService';

class InterpreterInfoModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            name: props.name,
            rating: 0,
            reviews: [],
            certifications: []
        };

        this.reloadDetails = this.reloadDetails.bind(this);
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({ open: false });
    }

    fetchDetails = () => {
        fetchRatingAndReviews(this.state.id)
            .then(data => {
                this.setState({
                    rating: data.rating,
                    certifications: data.certifications,
                    reviews: data.reviews
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    expandDetails = () => {
        this.openModal();
        if (!this.state.rating) {
            this.fetchDetails();
        }
    }

    reloadDetails = () => {
        this.fetchDetails();
    }

    render() {
        const languages = this.props.languages.map(lang => <div className={classes.language}>{lang.language}: {lang.fluency} </div>)
        const reviews = (this.state.reviews.length) ?
            this.state.reviews.map(review => <ReviewItem userName={review.userName} rating={review.rating} comment={review.comment} date={review.date} />)
            : <div className={classes.noReviews}>{this.props.name} Has No Reviews Yet.</div>;
        const certifications = this.state.certifications.map(cert => <CertificationItem title={cert.title} /*image={cert.image}*/ image='https://www.diplomaframe.com/images/Entities/document/v2/NbcmHVCertificate_H_original.png' isValidated={cert.isValidated} />)

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
                                    <div className={classes.title}>Certifications:
                                        <div className={classes.halfArea}>{certifications}</div>
                                    </div>
                                </Grid>

                                <Grid item xs={6}>
                                    <div className={classes.title}>Reviews:
                                        <div className={classes.halfArea}>{reviews}</div>
                                    </div>

                                    <div className={classes.reviewOptions}>
                                        {/* change to user's name here */}
                                        <ReviewModal id={this.state.id} name={this.state.name} userName={'Spicy Spice'} reloadDetails={this.reloadDetails} />
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
