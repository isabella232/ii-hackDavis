import React, { Component } from 'react';
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import classes from './LoginModal.module.css';
import TextField from '@material-ui/core/TextField';

import Button from '../../shared/Button/Button';
import { signIn } from '../../../services/UserService';

class LoginModal extends Component {
    constructor(props) {
        super();
        this.state = {
            open: props.open,
            email: '',
            password: '',
        }

        this.closeModal = this.closeModal.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

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

    switchToSignUp = () => {
        this.props.switchLoginModal();
        this.props.openSignUp();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = async () => {
        if (!this.state.email) {
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
        } else {
            const data = {
                email: this.state.email,
                password: this.state.password,
            }
            console.log(data)
            signIn(data)
                .then(data => {
                    this.props.processLogin(data.userKind);
                })
                .catch(e => {
                    console.log(e);
                    alert('You cannot be logged in at this time.')
                })
        }
    }

    render() {
        return (
            <Modal className={classes.Modal}
                open={this.state.open}
                onClose={this.closeModal}
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 200 }}>
                <Fade in={this.state.open}>
                    <div className={classes.card}>
                        <div className={classes.title}>Login</div>
                        <form encType="multipart/form-data">
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
                                type="password"
                                required
                                margin="dense"
                                value={this.props.location}
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />

                            <div className={classes.footer}>
                                <div>
                                    <Button content={'Forgot Password'} inverted click={this.submitForm} />
                                </div>
                                <div className={classes.buttons}>
                                    <Button content={'Sign Up'} inverted click={this.switchToSignUp} />
                                    <Button content={'Log In'} click={this.submitForm} />
                                </div>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        )
    }
}

export default LoginModal;
