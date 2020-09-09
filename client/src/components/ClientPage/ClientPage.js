import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import classes from './css/ClientPage.module.css'

import Grid from '@material-ui/core/Grid';
import Button from '../shared/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Bookmark from './Bookmark';
import EventCard from '../shared/EventCard';
import HorzLine from '../shared/HorzLine';
import LoadCircle from '../shared/LoadCircle';
import FileUploader from '../shared/FileUploader';
import DeleteModal from '../shared/DoubleCheckModal';
import UserTag from '../shared/UserTag';

import { fetchClientPage, updateClientInfo } from '../../services/ClientService';
import { updateUserPassword, deleteUser } from '../../services/UserService';

class ClientPage extends Component {
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
            bookmarks: [],
            events: [],
            window: 0,
            loading: false,
        }

        this.loadData = this.loadData.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitInfoForm = this.submitInfoForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
        this.clickShowNewPassword = this.clickShowNewPassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    loadData = () => {
        fetchClientPage()
            .then(data => {
                this.setState({
                    currentName: data.name,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    bookmarks: data.bookmarks,
                    events: data.events
                })
            }).catch(error => {
                console.log(error);
            })
    }

    clickShowNewPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showNewPassword
        this.setState({ showNewPassword: val });
    }

    fileUpload = (fileItem) => {
        this.setState({ file: fileItem });
    }

    loadCurrentWindow = () => {
        const curWindow = parseInt(localStorage.getItem('window'));
        if (curWindow && curWindow < 3)
            this.setState({ window: curWindow });
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
        if (!this.state.name) {
            this.props.enqueueSnackbar(`Please fill out your name.`, { variant: 'info' })
        } else {
            this.load();
            const data = {
                name: this.state.name,
                avatar: this.state.file
            };
            updateClientInfo(data)
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
                    this.props.enqueueSnackbar("Success! Your password has been updated.", { variant: 'success' });
                    this.setState({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
                    this.unload();
                }).catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                });
        }
    }

    switchWindow = (e, i) => {
        this.setState({ window: i });
        localStorage.setItem("window", i);
    }

    deleteAccount = () => {
        deleteUser(this.state.email)
            .then(data => {
                this.props.enqueueSnackbar("Your account has been deleted.", { variant: 'info' });
                setTimeout(() => {
                    this.props.history.go(0);
                }, 3000);
            }).catch(e => this.props.enqueueSnackbar("Your account cannot be deleted at this moment.", { variant: 'error' }))
    }

    render() {
        const menuItems = ['Upcoming Events', 'Bookmarks', 'Account Update'];
        const menu = menuItems.map((item, i) =>
            <div className={classes.menuItemWrapper} key={`client-page-menu-item-${i}`}>
                <div className={(this.state.window === i) ? classes.activeDot : classes.dot} />
                <div value={i}
                    className={(this.state.window === i) ? classes.activeMenuItem : classes.menuItem}
                    onClick={(e) => this.switchWindow(e, i)}>
                    {menuItems[i]}
                </div>
            </div>);

        const events = this.state.events.map((event, i) => {
            return <div key={`event-${i}`}>
                <EventCard id={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    summary={event.summary}
                    image={event.image}
                    reloadData={this.loadData} />
            </div>
        })

        const eventWindow = events.length ? events
            : <div className={classes.noItems}>There Is No Event Coming Up.</div>;

        const bookmarkWindow = this.state.bookmarks.length ?
            <>
                {this.state.bookmarks.map((bookmark, i) =>
                    <div key={`bookmark-${i}`}>
                        <Bookmark name={bookmark.name} email={bookmark.email}
                            languages={bookmark.languages} location={bookmark.location}
                            phone={bookmark.phone} rating={bookmark.rating} />
                    </div>)}
            </> : <div className={classes.noItems}>You Have No Bookmarks.</div>;

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

            <FileUploader label="Avatar" upload={this.fileUpload} />

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

        const windows = [eventWindow, bookmarkWindow, updateWindow];

        return (
            <div className={classes.ClientPage}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={5} md={4}>
                        <div className={classes.menuWrapper}>
                            <UserTag client name={this.state.currentName} avatar={this.state.avatar} />
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

                <LoadCircle open={this.state.load} />
            </div>
        )
    }
}

export default withRouter(withSnackbar(ClientPage));

