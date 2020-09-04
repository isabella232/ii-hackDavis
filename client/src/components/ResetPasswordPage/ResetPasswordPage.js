import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import classes from './ResetPasswordPage.module.css'

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '../shared/Button';

import { resetPassword } from '../../services/UserService';

class ResetPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            confirmPassword: '',
            showPassword: false,
            loading: false
        }

        this.clickShowPassword = this.clickShowPassword.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    clickShowPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showPassword
        this.setState({ showPassword: val });
    }

    clearAllFields = () => {
        this.setState({ password: '', confirmPassword: '' });
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = async () => {
        this.load();
        if (!this.state.password) {
            this.props.enqueueSnackbar(`Please fill out your password.`, { variant: 'info' })
        } else if (this.state.password !== this.state.confirmPassword) {
            this.props.enqueueSnackbar(`Passwords do not match. Check again.`, { variant: 'info' })
        } else if (this.state.password.length < 8) {
            this.props.enqueueSnackbar(`Password must be at least 8 characters.`, { variant: 'info' })
        } else {
            const id = this.props.location.pathname.split('/')[2];
            resetPassword(id, this.state.password)
                .then(data => {
                    this.clearAllFields();
                    this.props.history.push('/');
                    this.unload();
                })
                .catch(e => {
                    this.props.enqueueSnackbar('Your password cannot be reset at this time.', { variant: 'info' })
                    this.unload();
                })
        }
    }

    render() {
        return <div className={classes.ResetPasswordPage}>
            <div className={classes.header}>
                <div className={classes.title}>Reset Your Password</div>
                {this.state.loading ? <CircularProgress color="primary" size={25} /> : null}
            </div>

            <form encType="multipart/form-data">
                <Grid container spacing={2} justify='center'>
                    <Grid item xs={6}>
                        <TextField label="Password"
                            name="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            required
                            margin="dense"
                            value={this.state.password}
                            fullWidth
                            variant="outlined"
                            onChange={this.changeInput}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton onClick={this.clickShowPassword}>
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }} />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            margin="dense"
                            value={this.state.confirmPassword}
                            fullWidth
                            variant="outlined"
                            onChange={this.changeInput} />
                    </Grid>
                </Grid>

                <div className={classes.footer}>
                    <div className={classes.buttons}>
                        <Button content={'Reset'} click={this.submitForm} />
                    </div>
                </div>
            </form>
        </div>
    }
}

export default withRouter(withSnackbar(ResetPasswordPage));
