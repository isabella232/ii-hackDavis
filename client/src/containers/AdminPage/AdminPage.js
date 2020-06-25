import React, { Component } from 'react';
import classes from './AdminPage.module.css'

import Grid from '@material-ui/core/Grid';

import Avatar from '../../components/shared/Avatar/Avatar';
import CertificationCard from '../../components/AdminPage/CertificationCard/CertificationCard';
import EventCard from '../../components/shared/EventCard/EventCard';
import Button from '../../components/shared/Button/Button';
import EventModal from '../../components/AdminPage/EventModal/EventModal';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import HorzLine from '../../components/shared/HorzLine/HorzLine';
import FileUploader from '../../components/shared/FileUploader/FileUploader';

import { fetchData, createAdminCode, updateAdminInfo } from '../../services/AdminService';
import { updateUserPassword } from '../../services/UserService';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            currentName: '',
            name: '',
            email: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            avatar: '',
            file: null,  // for avatar
            pastEvents: [],
            upcomingEvents: [],
            interpreters: [],
            adminCode: '',
            window: 0
        }

        this.loadData = this.loadData.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitAdminCodeForm = this.submitAdminCodeForm.bind(this);
        this.submitInfoForm = this.submitInfoForm.bind(this);
        this.submitPasswordForm = this.submitPasswordForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
        this.getTarget = this.getTarget.bind(this);
    }

    loadData = () => {
        fetchData()
            .then(data => {
                this.setState({
                    name: data.name,
                    currentName: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    pastEvents: data.pastEvents,
                    upcomingEvents: data.upcomingEvents,
                    interpreters: data.toValidate
                })
            }).catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.loadData();
    }

    switchWindow = (e, i) => {
        this.setState({ window: i });
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitAdminCodeForm = () => {
        if (this.state.adminCode === '') {
            alert("Please fill out the admin code.")
        } else {
            createAdminCode(this.state.adminCode)
                .then(data => {
                    this.setState({ adminCode: '' });
                }).catch(error => {
                    alert("Failed to create admin code.");
                    console.log(error);
                })
        }
    }

    copyToClipboard = () => {
        const url = process.env.REACT_APP_BACKEND_URL + "/admin/register";
        navigator.clipboard.writeText(url);
    };

    submitPasswordForm = () => {
        if (!this.state.currentPassword) {
            alert(`Please fill out your current password.`);
        } else if (!this.state.newPassword) {
            alert(`Please fill out your new password.`);
        } else if (this.state.newPassword !== this.state.confirmNewPassword) {
            alert(`Please check your new password.`);
        } else if (this.state.length < 8 || this.state.confirmNewPassword.length < 8) {
            alert(`Password must be at least 8 characters.`);
        } else {
            const data = {
                currentPassword: this.state.currentPassword,
                newPassword: this.state.newPassword
            };
            updateUserPassword(data)
                .then(data => {
                }).catch(error => {
                    alert("Failed To Update Password.");
                    console.log(error);
                });
        }
    }

    submitInfoForm = () => {
        if (!this.state.name) {
            alert(`Please fill out your name.`);
        } else {
            const data = {
                name: this.state.name,
                avatar: this.state.file
            };
            updateAdminInfo(data)
                .then(data => {
                    this.loadData();
                }).catch(error => {
                    console.log(error);
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

    render() {
        const menuItems = ['Events', 'Certifications', 'Account Update', 'Admin Code'];
        const menu = menuItems.map((item, i) =>
            <div className={classes.menuItemWrapper}>
                <div className={(this.state.window === i) ? classes.activeDot : classes.dot} />
                <div id={`menu-item-${i}`} value={i}
                    className={(this.state.window === i) ? classes.activeMenuItem : classes.menuItem}
                    onClick={(e) => this.switchWindow(e, i)}>
                    {menuItems[i]}
                </div>
            </div>);

        const pastEvents = this.state.pastEvents.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                past
                reloadData={this.loadData}
                target={event.target} />
        })
        const upcomingEvents = this.state.upcomingEvents.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                reloadData={this.loadData}
                target={this.getTarget(event)} />
        })

        const eventWindow = <>
            <div className={classes.title}>Upcoming Events</div>
            {upcomingEvents.length ? upcomingEvents : <div className={classes.noItems}>There Is No Event Coming Up.</div>}

            <div className={classes.title}>Past Events</div>
            {pastEvents.length ? pastEvents : <div className={classes.noItems}>There Is No Past Event To Show.</div>}

            <div className={classes.buttons}>
                <Button content='Manage All Events' inverted />
                <EventModal reloadData={this.loadData} create />
            </div>
        </>;

        const certificateWindow = (this.state.interpreters.length) ?
            this.state.interpreters.map(interpreter => (
                interpreter.unvalidatedCertificates.map(certificate => (
                    <CertificationCard key={`${certificate.id}`}
                        id={certificate.id}
                        avatar={interpreter.avatar}
                        name={interpreter.name}
                        title={certificate.title}
                        location={interpreter.location}
                        certificateImage={certificate.image} />
                ))
            )) : <div className={classes.noItems}>There Is No Interpreters To Reviews.</div>;

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
                        type="password"
                        required
                        margin="dense"
                        value={this.state.newPassword}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
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
            <div className={classes.Container} >
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
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
                        <HorzLine />
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <div className={classes.window}>
                            {windows[this.state.window]}
                        </div>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

export default AdminPage;

