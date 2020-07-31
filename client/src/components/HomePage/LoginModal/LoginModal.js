import React, { Component } from 'react';
import classes from './LoginModal.module.css';

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Button from '../../shared/Button/Button';

import { signIn } from '../../../services/UserService';

class LoginModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: props.open,
            email: '',
            password: '',
            showPassword: false,
            loading: false
        }

        this.closeModal = this.closeModal.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.clickShowPassword = this.clickShowPassword.bind(this);
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
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
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
                    alert('You cannot be logged in at this time.')
                    this.unload();
                })
        }
    }

    pressEnter = (e) => {
        if (e.key === 'Enter') {
            this.submitForm();
        }
    }

    render() {
        return <>
            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.card}>

                        <div className={classes.header}>
                            <div className={classes.title}>Login</div>
                            {this.state.loading ? <CircularProgress color="primary" /> : null}
                        </div>

                        <TextField label="Email"
                            name="email"
                            required
                            value={this.props.title}
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
                                <Button content={'Forgot Password'} inverted />
                            </div>
                            <div className={classes.buttons}>
                                <Button content={'Sign Up'} inverted click={this.switchToSignUp} />
                                <Button content={'Log In'} click={this.submitForm} />
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    }
}

export default LoginModal;

