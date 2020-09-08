import React, { Component } from 'react';
import { withSnackbar } from 'notistack';

import classes from './css/LoginModal.module.css';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Button from '../shared/Button';

import { signIn, sendForgetPassword } from '../../services/UserService';

class LoginModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: props.open,
            email: '',
            password: '',
            showPassword: false,
            loading: false,
            window: 0,
        }

        this.closeModal = this.closeModal.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.clickShowPassword = this.clickShowPassword.bind(this);
        this.switchWindow = this.switchWindow.bind(this);
        this.submitForgetPassword = this.submitForgetPassword.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    openModal = () => {
        this.props.switchLoginModal();
    }

    closeModal = () => {
        this.props.switchLoginModal();
    }

    clickShowPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showPassword
        this.setState({ showPassword: val });
    }

    switchToSignUp = () => {
        this.props.switchLoginModal();
        this.props.openSignUp();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    clearAllFields = () => {
        this.setState({ email: null, password: null, showPassword: false });
    }

    submitForm = async () => {
        if (!this.state.email) {
            this.props.enqueueSnackbar(`Please fill out your email.`, { variant: 'warning' });
        } else if (!this.state.password) {
            this.props.enqueueSnackbar(`Please fill out your password.`, { variant: 'warning' });
        } else {
            this.load();
            const data = {
                email: this.state.email,
                password: this.state.password,
            }
            signIn(data)
                .then(data => {
                    this.clearAllFields();
                    this.props.processLogin(data.userKind);
                    this.unload();
                })
                .catch(e => {
                    this.props.enqueueSnackbar(e.message, { variant: 'error' });
                    this.unload();
                })
        }
    }

    submitForgetPassword = async () => {
        if (!this.state.email) {
            this.props.enqueueSnackbar(`Please fill out your email.`, { variant: 'warning' });
        } else {
            this.load();
            sendForgetPassword(this.state.email)
                .then(data => {
                    this.props.enqueueSnackbar(`Success! Your password has been reset.`, { variant: 'success' });
                    this.clearAllFields();
                    this.unload();
                    this.setState({ window: 0, open: false });
                })
                .catch(e => {
                    this.props.enqueueSnackbar('You cannot reset your password at this time.', { variant: 'error' });
                    this.unload();
                })
        }
    }

    pressEnter = (e) => {
        if (e.key === 'Enter' && !this.state.window) this.submitForm();
        else if (e.key === 'Enter' && this.state.window) this.submitForgetPassword();
    }

    switchWindow = () => {
        const newWindow = !this.state.window;
        this.setState({ window: newWindow })
    }

    render() {
        const loginWindow = <>
            <div className={classes.header}>
                <div className={classes.title}>Welcome Back!</div>
                {this.state.loading ? <CircularProgress color="primary" size={25} /> : null}
            </div>

            <TextField label="Email"
                name="email"
                required
                value={this.state.email}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />
            <TextField label="Password"
                name="password"
                type={this.state.showPassword ? 'text' : 'password'}
                required
                margin="dense"
                value={this.state.password}
                fullWidth
                variant="outlined"
                onChange={this.changeInput}
                onKeyDown={this.pressEnter}
                InputProps={{
                    endAdornment: <InputAdornment position="end">
                        <IconButton onClick={this.clickShowPassword}>
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }} />

            <div className={classes.footer}>
                <div>
                    <Button content={'Forgot Your Password?'} inverted click={this.switchWindow} />
                </div>
                <div className={classes.buttons}>
                    <Button content={'Sign Up'} inverted click={this.switchToSignUp} />
                    <Button content={'Log In'} click={this.submitForm} />
                </div>
            </div>
        </>

        const forgetPasswordWindow = <>
            <div className={classes.header}>
                <div className={classes.title}>It's Okay!</div>
                {this.state.loading ? <CircularProgress color="primary" size={25} /> : null}
            </div>
            <div className={classes.instruction}>Please input your email to receive instructions for password resetting.</div>

            <TextField label="Email"
                name="email"
                required
                value={this.state.email}
                margin="dense"
                fullWidth
                variant="outlined"
                onChange={this.changeInput} />
            <div className={classes.footer}>
                <div className={classes.buttons}>
                    <Button content={'Back'} inverted click={this.switchWindow} />
                    <Button content={'Submit'} click={this.submitForgetPassword} />
                </div>
            </div>
        </>;

        return <>
            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.card}>
                        {!this.state.window ? loginWindow : forgetPasswordWindow}
                    </div>
                </Fade>
            </Modal>
        </>
    }
}

export default withSnackbar(LoginModal);

