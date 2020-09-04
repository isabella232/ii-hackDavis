import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import classes from './AdminPage.module.css'

import Grid from '@material-ui/core/Grid';

import Avatar from '../../components/shared/Avatar/Avatar';
import CertificationCard from '../../components/AdminPage/CertificationCard/CertificationCard';
import EventCard from '../../components/shared/EventCard/EventCard';
import Button from '../../components/shared/Button/Button';
import EventModal from '../../components/AdminPage/EventModal/EventModal';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import HorzLine from '../../components/shared/HorzLine/HorzLine';
import LoadCircle from '../../components/shared/LoadCircle/LoadCircle';
import FileUploader from '../../components/shared/FileUploader/FileUploader';
import DeleteModal from '../../components/shared/DoubleCheckModal/DoubleCheckModal';

import {
    fetchInfo, createAdminCode, updateAdminInfo, fetchEventArchive, fetchEvents,
    rejectInterpreter, verifyInterpreter, fetchToReviews
} from '../../services/AdminService';
import { updateUserPassword, deleteUser } from '../../services/UserService';

class AdminPage extends Component {
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
            pastEvents: [],
            upcomingEvents: [],
            archivedEvents: [],
            interpreters: [],
            adminCode: '',
            window: 0,
            eventWindow: 0,
            loading: false,
            archiveVisited: false
        }

        this.loadInfo = this.loadInfo.bind(this);
        this.loadToReviews = this.loadToReviews.bind(this);
        this.loadEvents = this.loadEvents.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitAdminCodeForm = this.submitAdminCodeForm.bind(this);
        this.submitInfoForm = this.submitInfoForm.bind(this);
        this.submitPasswordForm = this.submitPasswordForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
        this.getTarget = this.getTarget.bind(this);
        this.showEventArchive = this.showEventArchive.bind(this);
        this.hideEventArchive = this.hideEventArchive.bind(this);
        this.clickRejectInterpreter = this.clickRejectInterpreter.bind(this);
        this.clickVerifyInterpreter = this.clickVerifyInterpreter.bind(this);
        this.clickShowNewPassword = this.clickShowNewPassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    clickShowNewPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showNewPassword
        this.setState({ showNewPassword: val });
    }

    loadInfo = () => {
        this.load();
        fetchInfo()
            .then(data => {
                this.setState({
                    name: data.name,
                    currentName: data.name,
                    email: data.email,
                    avatar: data.avatar,
                });
                this.unload();
            }).catch(error => {
                this.unload();
            })
        this.loadToReviews();
    }

    loadToReviews = async () => {
        this.load();
        fetchToReviews()
            .then(data => {
                this.setState({
                    interpreters: data
                });
                this.unload();
            }).catch(error => {
                this.unload();
            })
    }

    loadEvents = async () => {
        this.load();
        fetchEvents()
            .then(data => {
                this.setState({
                    pastEvents: data.pastEvents,
                    upcomingEvents: data.upcomingEvents,
                });
                this.unload();
            }).catch(error => {
                this.unload();
            })
    }

    loadCurrentWindow = () => {
        const curWindow = parseInt(localStorage.getItem('window'));
        if (curWindow && curWindow < 4)
            this.setState({ window: curWindow });
    }

    componentDidMount() {
        this.loadCurrentWindow();
        this.loadEvents();
        this.loadToReviews();
        this.loadInfo();
    }

    switchWindow = (e, i) => {
        this.setState({ window: i });
        localStorage.setItem('window', i);
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    fileUpload = (fileItem) => {
        this.setState({ file: fileItem });
    }

    submitAdminCodeForm = () => {
        if (this.state.adminCode === '') {
            this.props.enqueueSnackbar("Please fill out the admin code.", { variant: 'info' });
        } else {
            this.load();
            createAdminCode(this.state.adminCode)
                .then(data => {
                    this.setState({ adminCode: '' });
                    this.unload();
                    this.props.enqueueSnackbar("Success! A new admin code has been created.", { variant: 'success' });
                }).catch(error => {
                    this.props.enqueueSnackbar("Failed to create admin code.", { variant: 'error' });
                    this.unload();
                })
        }
    }

    copyToClipboard = () => {
        const url = process.env.REACT_APP_BACKEND_URL + "/admin/register";
        navigator.clipboard.writeText(url);
    };

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
                    this.unload();
                    this.props.enqueueSnackbar("Success! Your password has been updated.", { variant: 'success' });
                }).catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                });
        }
    }

    submitInfoForm = () => {
        if (!this.state.name) {
            this.props.enqueueSnackbar(`Please fill out your name.`, { variant: 'info' });
        } else {
            this.load();
            const data = {
                name: this.state.name,
                avatar: this.state.file
            };
            updateAdminInfo(data)
                .then(data => {
                    this.loadInfo();
                    this.unload();
                    this.props.enqueueSnackbar("Success! Your profile has been updated.", { variant: 'success' });
                }).catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                });
        }
    }

    getTarget = (event) => {
        if (event.forInterpreters && event.forClients) {
            return "Everyone";
        } else if (event.forInterpreters) {
            return "Interpreters Only";
        } else if (event.forClients) {
            return "Clients Only";
        }
    }

    loadEventArchive = () => {
        this.load();
        fetchEventArchive()
            .then(data => {
                this.setState({ archivedEvents: data.archivedEvents });
                this.unload();
            }).catch(error => {
                this.unload();
            });
    }

    showEventArchive = () => {
        if (!this.state.archiveVisited) {
            this.loadEventArchive();
            this.setState({
                archiveVisited: true,
                eventWindow: 1
            });
            return
        }
        this.setState({ eventWindow: 1 });
    }

    hideEventArchive = () => {
        this.setState({ eventWindow: 0 });
    }

    clickRejectInterpreter = (id) => {
        this.load();
        rejectInterpreter(id)
            .then(data => {
                this.loadToReviews();
                this.unload();
            })
            .catch(e => {
                this.props.enqueueSnackbar('Failed to reject interpreter.', { variant: 'error' });
                this.unload();
            });
    }

    clickVerifyInterpreter = (id) => {
        this.load();
        verifyInterpreter(id)
            .then(data => {
                this.loadToReviews();
                this.unload();
            })
            .catch(e => {
                this.props.enqueueSnackbar('Failed to verify interpreter.', { variant: 'error' });
                this.unload();
            });
    }

    deleteAccount = () => {
        deleteUser(this.state.email)
            .then(data => {
                this.props.enqueueSnackbar("Your account has been deleted.", { variant: 'info' });
                this.props.history.go(0);
            }).catch(e => this.props.enqueueSnackbar("Your account cannot be deleted at this moment.", { variant: 'error' }))
    }

    render() {
        const menuItems = ['Events', 'Review Interpreters', 'Account Update', 'Admin Code'];
        const menu = menuItems.map((item, i) => {
            return <div className={classes.menuItemWrapper} key={`menu-item-${i}`}>
                <div className={(this.state.window === i) ? classes.activeDot : classes.dot} />
                <div value={i} onClick={(e) => this.switchWindow(e, i)}
                    className={(this.state.window === i) ? classes.activeMenuItem : classes.menuItem}>
                    {menuItems[i]}
                </div>
            </div>
        });

        const pastEvents = this.state.pastEvents.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                author={event.author}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                past
                target={this.getTarget(event)}
                loadEvents={this.loadEvents}
                loadEventArchive={this.loadEventArchive} />
        });
        const upcomingEvents = this.state.upcomingEvents.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                author={event.author}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                loadEvents={this.loadEvents}
                target={this.getTarget(event)} />
        });
        const events = <>
            <div className={classes.title}>Upcoming Events</div>
            {upcomingEvents.length ? upcomingEvents : <div className={classes.noItems}>There Is No Event Coming Up.</div>}

            <div className={classes.title}>Past Events</div>
            {pastEvents.length ? pastEvents : <div className={classes.noItems}>There Is No Past Event To Show.</div>}

            <div className={classes.buttons}>
                <Button content='Show Archive' inverted click={this.showEventArchive} />
                <EventModal reloadData={this.loadEvents} create />
            </div></>;
        const eventArchive = <>
            {this.state.archivedEvents.length ?
                this.state.archivedEvents.map(event => {
                    return <EventCard id={event.id}
                        key={`event-${event.id}`}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                        summary={event.summary}
                        image={event.image}
                        past
                        reloadData={this.loadInfo}
                        target={event.target} />
                }) : <div className={classes.noItems}>There Is No Events In Archive.</div>}
            <div className={classes.buttons}>
                <Button content='Back' click={this.hideEventArchive} />
            </div>
        </>;
        const eventWindow = !this.state.eventWindow ? events : eventArchive;

        const certificateWindow = (this.state.interpreters.length) ?
            this.state.interpreters.map(interpreter => <div className={classes.interpreterCard}>
                <div className={classes.interpreterInfo}>
                    <div className={classes.flexArea}>
                        <Avatar name={interpreter.name} avatar={interpreter.avatar} size={7} />
                        <div>
                            <div className={classes.infoItem}>
                                <strong>{interpreter.name}</strong>
                                {interpreter.isVerified ? <CheckCircleIcon className={classes.verifyIcon}
                                    fontSize="small" color="primary" /> : null}
                                {interpreter.isRejected ? <CancelIcon className={classes.verifyIcon}
                                    fontSize="small" color="error" /> : null}
                            </div>
                            <div className={classes.infoItem}>
                                {interpreter.location}
                            </div>
                        </div>
                    </div>

                    <div>
                        {!interpreter.isRejected ?
                            <Button content="Reject" id={interpreter.id} invertedDelete
                                click={this.clickRejectInterpreter} />
                            : null}
                        {!interpreter.isVerified ?
                            <Button content="Verify" id={interpreter.id}
                                click={this.clickVerifyInterpreter} />
                            : null}
                    </div>
                </div>
                {interpreter.unvalidatedCertificates.map(certificate => (
                    <CertificationCard key={`${certificate.id}`}
                        id={certificate.id}
                        avatar={interpreter.avatar}
                        name={interpreter.name}
                        title={certificate.title}
                        location={interpreter.location}
                        img={certificate.image} />
                ))}
            </div>) : <div className={classes.noItems}>There Is No Interpreters To Reviews.</div>;

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
            <div className={classes.fileUpload}>
                <div className={classes.label}>Avatar</div>
                <FileUploader upload={this.fileUpload} />
            </div>
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

        const adminCodeWindow = <>
            <TextField label="Admin Code"
                name="adminCode"
                required
                value={this.state.adminCode}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />

            <div className={classes.adminCodeButton}>
                <Button content='Copy Admin Register URL' click={this.copyToClipboard} />
                <Button content='Create Admin Code' click={this.submitAdminCodeForm} />
            </div>
        </>;

        const windows = [eventWindow, certificateWindow, updateWindow, adminCodeWindow];

        return (
            <div className={classes.AdminPage} >
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.menuWrapper}>
                            <div className={classes.userCard}>
                                <div className={classes.userInfo}>
                                    <Avatar name={this.state.name} avatar={this.state.avatar} size={7} />
                                    <div className={classes.flexArea}>
                                        <div className={classes.userName}>{this.state.currentName}</div>
                                        <AccountCircleIcon className={classes.adminIcon}
                                            fontSize="small" color="primary" />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.menu}>
                                {menu}
                            </div>
                        </div>
                        <HorzLine />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <div className={classes.window}>
                            {windows[this.state.window]}
                        </div>
                    </Grid>
                </Grid>

                <LoadCircle open={this.state.loading} />
            </div>
        )
    }
}

export default withRouter(withSnackbar(AdminPage));

