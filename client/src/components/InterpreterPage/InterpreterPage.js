import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import classes from './InterpreterPage.module.css'

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Button from '../shared/Button';
import CertificationCard from '../shared/CertificationCard';
import EventCard from '../shared/EventCard';
import LoadCircle from '../shared/LoadCircle';
import FileUploader from '../shared/FileUploader';
import HorzLine from '../shared/HorzLine';
import ReviewItem from '../SearchPage/ReviewItem';
import Paper from '../shared/Paper';
import DeleteModal from '../shared/DoubleCheckModal';
import UserTag from '../shared/UserTag';

import {
    fetchInterpreterPage, updateInterpreterInfo,
    uploadCertificate, deleteCertificate
} from '../../services/InterpreterService';
import { updateUserPassword, deleteUser } from '../../services/UserService';

class InterpreterPage extends Component {
    constructor() {
        super();
        this.state = {
            currentName: '',
            name: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            showNewPassword: '',
            confirmNewPassword: '',
            avatar: '',
            file: null,  // for avatar
            title: '', // for certificate
            certificate: null,
            location: '',
            phone: '',
            languages: [],
            certifications: [],
            services: {
                Simultaneous: false,
                Consecutive: false,
                Relay: false,
                Translating: false
            },
            rating: 0,
            reviews: [],
            isVerified: false,
            isRejected: false,
            summary: '',
            events: [],
            window: 0,
            loading: false,
        }

        this.loadData = this.loadData.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.avatarUpload = this.avatarUpload.bind(this);
        this.submitInfoForm = this.submitInfoForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
        this.changeServices = this.changeServices.bind(this);
        this.deleteCertificate = this.deleteCertificate.bind(this);
        this.clickShowNewPassword = this.clickShowNewPassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    loadData = () => {
        fetchInterpreterPage()
            .then(data => {
                const services = this.state.services;
                data.services.forEach(service => {
                    services[service] = true;
                })
                this.setState({
                    currentName: data.name,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    location: data.location,
                    phone: data.phone,
                    languages: data.languages,
                    certifications: data.certifications,
                    rating: data.rating,
                    services: services,
                    reviews: data.reviews,
                    isVerified: data.isVerified,
                    isRejected: data.isRejected,
                    summary: data.summary,
                    events: data.events
                })
            }).catch(error => {
                console.log(error);
            })
    }

    loadCurrentWindow = () => {
        const curWindow = parseInt(localStorage.getItem('window'));
        if (curWindow && curWindow < 4)
            this.setState({ window: curWindow });
    }

    clickShowNewPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showNewPassword
        this.setState({ showNewPassword: val });
    }

    avatarUpload = (fileItem) => {
        this.setState({ file: fileItem });
    }

    certificateUpload = (fileItem) => {
        this.setState({ certificate: fileItem });
    }

    componentDidMount() {
        this.loadData();
        this.loadCurrentWindow();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitInfoForm = () => {
        this.load();
        let check = true;
        for (const lang in this.state.languages) {
            if (lang.language === '' || lang.fluency === '') {
                check = false;
                this.props.enqueueSnackbar("Please fill out all of the language fields.", { variant: 'info' });
                break;
            }
        }

        let services = [];
        for (const [key, val] of Object.entries(this.state.services)) {
            if (val) {
                services.push(key);
            }
        }

        if (check) {
            const data = {
                name: this.state.name,
                avatar: this.state.file,
                languages: this.state.languages,
                services: services,
                location: this.state.location,
                summary: this.state.summary
            };
            updateInterpreterInfo(data)
                .then(data => {
                    this.loadData();
                    this.unload();
                    this.props.enqueueSnackbar("Success! Your profile has been updated.", { variant: 'success' });
                }).catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                });
        }
    }

    submitPasswordForm = () => {
        if (!this.state.currentPassword) {
            this.props.enqueueSnackbar(`Please fill out your current password.`, { variant: 'info' });
        } else if (!this.state.newPassword) {
            this.props.enqueueSnackbar(`Please fill out your new password.`, { variant: 'info' });
        } else if (this.state.newPassword.length < 8) {
            this.props.enqueueSnackbar(`New password must be at least 8 characters.`, { variant: 'info' });
        } else if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.props.enqueueSnackbar(`Passwords do not match. Check again.`, { variant: 'info' });
        } else {
            this.load();
            const data = {
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            };
            updateUserPassword(data)
                .then(data => {
                    this.setState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                    this.props.enqueueSnackbar("Success! Your password has been updated.", { variant: 'success' });
                    this.unload();
                }).catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                });
        }
    }

    submitCertificateForm = () => {
        if (!this.state.title) {
            this.props.enqueueSnackbar("Please fill out the certificate's title.", { variant: 'info' });
        } else if (!this.state.certificate) {
            this.props.enqueueSnackbar("Please upload your certificate.", { variant: 'info' });
        } else {
            this.load();
            const data = {
                title: this.state.title,
                certificate: this.state.certificate
            };
            uploadCertificate(data)
                .then(data => {
                    this.setState({ title: '' });
                    this.loadData();
                    this.unload();
                    this.props.enqueueSnackbar("Success! Your certificate has been updated.", { variant: 'success' });
                }).catch(error => {
                    this.props.enqueueSnackbar("Failed To Upload Certificate.", { variant: 'error' });
                    this.unload();
                });
        }
    }

    switchWindow = (e, i) => {
        this.setState({ window: i });
        localStorage.setItem("window", i);
    }

    pushLangField = () => {
        const languages = this.state.languages;
        languages.push({ language: '', fluency: 1 });
        this.setState({ languages: languages });
    }

    popLangField = () => {
        const languages = this.state.languages;
        languages.pop();
        this.setState({ languages: languages });
    }

    changeLanguage = (e, i) => {
        e.preventDefault();
        const languages = this.state.languages;
        languages[i].language = e.target.value;
        this.setState({ languages: languages });
    }

    changeFluency = (e, i) => {
        e.preventDefault();
        const languages = this.state.languages;
        languages[i].fluency = e.target.value;
        this.setState({ languages: languages });
    }

    changeServices = (e) => {
        e.preventDefault();
        const services = { ...this.state.services };
        services[e.target.name] = e.target.checked;
        this.setState({ services: services });
    }

    deleteCertificate = (id) => {
        this.load();
        deleteCertificate(id)
            .then(data => {
                this.loadData();
                this.unload();
                this.props.enqueueSnackbar('Your certificate has been deleted.', { variant: 'info' });
            })
            .catch(error => {
                this.props.enqueueSnackbar('Failed To Delete Certificate.', { variant: 'error' });
                this.unload();
            })
    }

    deleteAccount = () => {
        deleteUser(this.state.email)
            .then(data => {
                this.props.enqueueSnackbar("Your account has been deleted.", { variant: 'info' });
                this.props.history.go(0);
            }).catch(e => this.props.enqueueSnackbar("Your account cannot be deleted at this moment.", { variant: 'error' }))
    }

    render() {
        const menuItems = ['Upcoming Events', 'Reviews', 'Certifications', 'Account Update'];
        const menu = menuItems.map((item, i) =>
            <div className={classes.menuItemWrapper} key={`menu-item-${i}`}>
                <div className={(this.state.window === i) ? classes.activeDot : classes.dot} />
                <div value={i}
                    className={(this.state.window === i) ? classes.activeMenuItem : classes.menuItem}
                    onClick={(e) => this.switchWindow(e, i)}>
                    {menuItems[i]}
                </div>
            </div>);

        const events = this.state.events.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                reloadData={this.loadData} />
        })

        const eventWindow = events.length ? events
            : <div className={classes.noItems}>There Is No Event Coming Up.</div>;

        const certificates = this.state.certifications.map(certificate => (
            <div key={`${certificate.id}`}>
                <CertificationCard
                    interpreter
                    id={certificate.id}
                    avatar={this.state.avatar}
                    name={this.state.currentName}
                    title={certificate.title}
                    location={this.state.location}
                    img={certificate.image}
                    isValidated={certificate.isValidated}
                    isRejected={certificate.isRejected}
                    deleteCertificate={this.deleteCertificate} />
            </div>
        ));
        const certificationWindow = <div>
            <TextField label="Title" name="title" required value={this.state.title}
                margin="dense" fullWidth variant="outlined"
                onChange={this.changeInput} />
            <FileUploader label="Certificate" upload={this.certificateUpload} />
            <div className={classes.buttons}>
                <Button content={'Upload Certificate'} click={this.submitCertificateForm} />
            </div>
            <HorzLine />
            {certificates}
        </div>

        const reviewWindow = <div className={classes.reviewWindow}>
            {this.state.reviews.length ? this.state.reviews.map((review, i) => {
                return (<div className={classes.reviewItem} key={`interpreter-page-review-item-${i}`}>
                    <Paper>
                        <ReviewItem reviewerName={review.reviewerName} comment={review.comment}
                            date={review.date} rating={review.rating} />
                    </Paper>
                </div>)
            }) : <div className={classes.noItems}>There Is No Reviews Yet.</div>}
        </div >;

        const addIcon = <AddIcon className={classes.langFieldIcon} color="primary" onClick={this.pushLangField} />;
        const removeIcon = <HighlightOffIcon className={classes.langFieldIcon} color="error" onClick={this.popLangField} />;
        const fluencyChoices = [];
        for (let i = 1; i <= 5; i++) {
            fluencyChoices.push(<MenuItem key={`interpreter-page-menu-item-${i}`} value={i}>{i}</MenuItem>)
        }
        const langFields = this.state.languages.map((lang, i) => {
            return (
                <div id={`interpreter-page-lang-grid-${i}`}>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <TextField label="Language"
                                name="language"
                                required
                                value={lang.language}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                onChange={(e) => this.changeLanguage(e, i)} />
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl variant="outlined" fullWidth margin="dense">
                                <InputLabel>Fluency</InputLabel>
                                <Select label="Age"
                                    value={lang.fluency}
                                    onChange={(e) => this.changeFluency(e, i)}>
                                    {fluencyChoices}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={2}>
                            <div className={classes.langFieldIcons}>
                                {(i > 0) ? removeIcon : null}
                                {(this.state.languages.length === 1 || i === this.state.languages.length - 1) ? addIcon : null}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        });

        const updateWindow = <>
            <Grid container spacing={2} justify='center'>
                <Grid item xs={6}>
                    <TextField label="Name"
                        name="name"
                        required
                        value={this.state.name}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Email"
                        name="email"
                        disabled
                        required
                        value={this.state.email}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />

                </Grid>
            </Grid>
            <FileUploader label="Avatar" upload={this.avatarUpload} />
            {langFields}
            <div className={classes.serviceLabel}>Services:</div>
            <FormGroup row>
                <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Simultaneous} onChange={this.changeServices} name="Simultaneous" />} label="Simultaneous" />
                <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Consecutive} onChange={this.changeServices} name="Consecutive" />} label="Consecutive" />
                <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Relay} onChange={this.changeServices} name="Relay" />} label="Relay" />
                <FormControlLabel control={<Checkbox color="primary" checked={this.state.services.Translating} onChange={this.changeServices} name="Translating" />} label="Translating" />
            </FormGroup>

            <TextField label="Location"
                name="location"
                required
                value={this.state.location}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />

            <TextField label="Summary"
                name="summary"
                value={this.state.summary}
                margin="dense"
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                onChange={this.changeInput} />
            <div className={classes.buttons}>
                <Button content={'Update Info'} click={this.submitInfoForm} />
            </div>

            <HorzLine />

            <TextField label="Current Password"
                name="currentPassword"
                type="password"
                required
                margin="dense"
                value={this.state.currentPassword}
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />
            <Grid container spacing={2} justify='center'>
                <Grid item xs={6}>
                    <TextField label="New Password"
                        name="newPassword"
                        type={this.state.showNewPassword ? 'text' : 'password'}
                        required
                        margin="dense"
                        value={this.state.newPassword}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={this.clickShowNewPassword}>
                                    {this.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }} />
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        required
                        margin="dense"
                        value={this.state.confirmNewPassword}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </Grid>
            </Grid>
            <div className={classes.buttons}>
                <Button content={'Update Password'} click={this.submitPasswordForm} />
            </div>

            <HorzLine />

            <div className={classes.buttons}>
                <DeleteModal content={'Are You Sure You Want To Permanently Delete Your Account?'} account clickDelete={this.deleteAccount} />
            </div>
        </>;

        const windows = [eventWindow, reviewWindow, certificationWindow, updateWindow];

        return (
            <div className={classes.InterpreterPage}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={5} md={4}>
                        <div className={classes.menuWrapper}>
                            <UserTag interpreter isVerified={this.state.isVerified} isRejected={this.state.isRejected}
                                name={this.state.currentName} rating={this.state.rating} />

                            <div className={classes.menu}>
                                {menu}
                            </div>
                            <HorzLine />
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={7} md={8}>
                        <div className={classes.window}>
                            {windows[this.state.window]}
                        </div>
                    </Grid>
                </Grid>

                <LoadCircle open={this.state.loading} />
            </div >
        )
    }
}

export default withRouter(withSnackbar(InterpreterPage));

