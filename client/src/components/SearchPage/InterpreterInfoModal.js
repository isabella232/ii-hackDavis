import React, { Component } from "react";
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';

import classes from './css/InterpreterInfoModal.module.css';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import Button from '../shared/Button';
import CertificationItem from './CertificateItem';
import ReviewItem from './ReviewItem';
import ReviewModal from './ReviewModal';
import LoadCircle from '../shared/LoadCircle';

import { rejectInterpreter, verifyInterpreter } from '../../services/AdminService';
import { fetchRatingAndReviews } from '../../services/InterpreterService';
import { bookmarkInterpreter } from '../../services/ClientService';

class InterpreterInfoModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            id: props.id,
            name: props.name,
            rating: 0,
            reviews: [],
            certifications: [],
            isRejected: false,
            loading: false
        };

        this.reloadDetails = this.reloadDetails.bind(this);
        this.bookmark = this.bookmark.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

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

    bookmark = () => {
        bookmarkInterpreter(this.props.email)
            .then(data => {
                this.props.enqueueSnackbar("Success! This interpreter has been bookmarked.", { variant: 'success' })
            }).catch(e => {
                this.props.enqueueSnackbar("This interpreter cannot be bookmarked at the moment.", { variant: 'error' })
            })
    }

    clickVerifyInterpreter = (id) => {
        this.load();
        verifyInterpreter(id)
            .then(data => {
                this.setState({ isRejected: false });
                this.unload();
                this.props.enqueueSnackbar("Success! This interpreter has been verified.", { variant: 'success' })
            })
            .catch(e => {
                this.props.enqueueSnackbar("This interpreter cannot be verified at the moment.", { variant: 'error' })
                this.unload();
            });
    }

    clickRejectInterpreter = (id) => {
        this.load();
        rejectInterpreter(id)
            .then(data => {
                this.setState({ isRejected: true });
                this.unload();
                this.props.enqueueSnackbar("This interpreter has been rejected.", { variant: 'info' })
            })
            .catch(e => {
                this.props.enqueueSnackbar("This interpreter cannot be rejected at the moment.", { variant: 'error' })
                this.unload();
            });
    }

    render() {
        const services = this.props.services.map((service, i) => (i < this.props.services.length - 1) ? service + ', ' : service);
        const languages = this.props.languages.map((lang, i) => {
            const str = lang.language + ' (' + lang.fluency + ')';
            return (i < this.props.languages.length - 1) ? str + ', ' : str;
        });
        const reviews = (this.state.reviews.length) ?
            this.state.reviews.map((review, i) => (
                <div key={`info-review-item-${i}`}>
                    <ReviewItem reviewerName={review.reviewerName} rating={review.rating}
                        comment={review.comment} date={review.date} />
                </div >))
            : <div className={classes.noReviews}>{this.props.name} Has No Reviews Yet.</div>;
        const certifications = this.state.certifications.map((cert, i) => (
            <div key={`info-cert-item-${i}`}>
                <CertificationItem title={cert.title} image={cert.image} isValidated={cert.isValidated} id={cert.id} />
            </div>))

        return (
            <div>
                {this.props.isLoggedIn ?
                    <div className={classes.moreInfo} onClick={this.expandDetails}>more info</div>
                    : null}

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
                                        <img src={this.props.avatar} width='100%' alt={`avatar-${this.props.id}`} />
                                    </div>
                                </Grid>

                                <Grid item xs={7} sm={7}>
                                    <div className={classes.name}>
                                        {this.props.name}
                                        {!this.state.isRejected ? <CheckCircleIcon className={classes.verifyIcon}
                                            fontSize="small" color="primary" /> : null}
                                        {this.state.isRejected ? <CancelIcon className={classes.verifyIcon}
                                            fontSize="small" color="error" /> : null}
                                    </div>
                                    <div className={classes.infoItem}>
                                        <Rating className={classes.rating}
                                            value={this.state.rating} readOnly />
                                    </div>
                                    <div className={classes.infoSection}>
                                        <div className={classes.infoItem}>
                                            <div className={classes.infoTitle}>Email</div>
                                            {this.props.email}
                                        </div>
                                        <div className={classes.infoItem}>
                                            <div className={classes.infoTitle}>Phone Number</div>
                                            {this.props.phone}
                                        </div>
                                        <div className={classes.infoItem}>
                                            <div className={classes.infoTitle}>Location</div>
                                            {this.props.location}
                                        </div>
                                        <div className={classes.mtlInfoItem}>
                                            <div className={classes.infoTitle}>Services</div>
                                            <div className={classes.mtlContent}>{services}</div>
                                        </div>
                                        <div className={classes.mtlInfoItem}>
                                            <div className={classes.infoTitle}>Language (Fluency)
                                            <span className={classes.scale}> *scale of 1-5</span>
                                            </div>
                                            <div className={classes.mtlContent}>{languages}</div>
                                        </div>
                                        <div className={classes.mtlInfoItem}>
                                            <div className={classes.infoTitle}>Summary</div>
                                            <div className={classes.mtlContent}>{this.props.summary}</div>
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
                                </Grid>
                            </Grid>

                            <div className={classes.buttons}>
                                {this.props.userKind === 'Client' ?
                                    <Button content={'Bookmark'} click={this.bookmark} />
                                    : null}
                                {this.props.userKind === 'Admin' ? <>

                                    {!this.state.isRejected ?
                                        <Button content={'Reject'} id={this.state.id} invertedDelete click={this.clickRejectInterpreter} />
                                        : <Button content="Verify" id={this.state.id} click={this.clickVerifyInterpreter} />}
                                </>
                                    : null}
                                <ReviewModal id={this.state.id} name={this.state.name} reloadDetails={this.reloadDetails} />
                            </div>

                            <LoadCircle open={this.state.loading} />
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.isLoggedIn,
    userKind: state.userKind
});

export default connect(mapStateToProps)(withSnackbar(InterpreterInfoModal));
