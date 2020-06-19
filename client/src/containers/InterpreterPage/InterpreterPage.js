import React, { Component } from 'react';
import classes from './InterpreterPage.module.css'

import Grid from '@material-ui/core/Grid';
import Button from '../../components/shared/Button/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '../../components/shared/Avatar/Avatar';
import HorzLine from '../../components/shared/HorzLine/HorzLine';
import FileUploader from '../../components/shared/FileUploader/FileUploader';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Rating from '@material-ui/lab/Rating';

import { fetchInterpreterPage, updateInterpreterInfo } from '../../services/InterpreterService';
import { updateUserPassword } from '../../services/UserService';

class InterpreterPage extends Component {
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
            bookmarks: [],
            window: 0
        }

        this.loadData = this.loadData.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitInfoForm = this.submitInfoForm.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
    }

    loadData = () => {
        fetchInterpreterPage()
            .then(data => {
                console.log('here', data);
                this.setState({
                    currentName: data.name,
                    name: data.name,
                    email: data.email,
                    avatar: data.avatar,
                    bookmarks: data.bookmarks
                })
            }).catch(error => {
                console.log(error);
            })
    }

    fileUpload = (fileItem) => {
        this.setState({ file: fileItem });
    }

    componentDidMount() {
        this.loadData();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitInfoForm = () => {
        if (!this.state.name || this.state.name === this.state.currentName) {
            alert(`Please fill out your name.`);
        } else {
            const data = {
                name: this.state.name,
                avatar: this.state.file
            };
            updateInterpreterInfo(data)
                .then(data => {
                    this.loadData();
                }).catch(error => {
                    console.log(error);
                });
        }
    }

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

    switchWindow = (e, i) => {
        this.setState({ window: i });
    }

    render() {
        const menuItems = ['Events', 'Bookmarks', 'Account Update'];
        const menu = menuItems.map((item, i) =>
            <div className={classes.menuItemWrapper}>
                <div className={(this.state.window === i) ? classes.activeDot : classes.dot} />
                <div id={`menu-item-${i}`} value={i}
                    className={(this.state.window === i) ? classes.activeMenuItem : classes.menuItem}
                    onClick={(e) => this.switchWindow(e, i)}>
                    {menuItems[i]}
                </div>
            </div>);

        const eventWindow = <div>event</div>;
        const bookmarkWindow = <div>bookmarks</div>

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
                <FileUploader upload={this.state.fileUpload} />
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

        const windows = [eventWindow, bookmarkWindow, updateWindow];

        return (
            <div className={classes.Container}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.userCard}>
                            <div className={classes.userInfo}>
                                <Avatar name={this.state.name} avatar={this.state.avatar} size={7} />
                                <div className={classes.userName}>{this.state.currentName}</div>
                                <CheckCircleIcon color="primary" />
                                <Rating value={3.5} precision={0.5} readOnly />
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

export default InterpreterPage;

