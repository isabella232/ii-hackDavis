import React, { Component } from 'react';
import classes from './AdminSignUpPage.module.css';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '../../components/shared/Button/Button';
import FileUploader from '../../components/shared/FileUploader/FileUploader';
import { signUpAdmin } from '../../services/UserService';

class AdminSignUpPage extends Component {
    constructor(props) {
        super();
        this.state = {
            kind: 'Admin',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: null,
            adminCode: '',
            showPassword: false,
            showAdminCode: false,
            loading: false
        }

        this.clickShowPassword = this.clickShowPassword.bind(this);
        this.clickShowAdminCode = this.clickShowAdminCode.bind(this);
        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    load = () => { this.setState({ loading: true }); }

    unload = () => { this.setState({ loading: false }); }

    clickShowPassword = (event) => {
        event.preventDefault();
        const val = !this.state.showPassword
        this.setState({ showPassword: val });
    }

    clickShowAdminCode = (event) => {
        event.preventDefault();
        const val = !this.state.showAdminCode
        this.setState({ showAdminCode: val });
    };

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    fileUpload = (fileItem) => {
        this.setState({ avatar: fileItem });
    }

    clearAllFields = () => {
        const state = {
            kind: 'Admin',
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            avatar: null,
            adminCode: ''
        };
        for (const field in state) {
            this.setState({ [field]: state[field] });
        }
    }

    submitForm = async () => {
        this.load();
        if (!this.state.email) {
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
        } else if (!this.state.avatar) {
            alert(`Please upload your avatar.`);
        } else if (this.state.password !== this.state.confirmPassword) {
            alert(`Passwords do not match. Check again.`);
        } else if (this.state.password.length < 8) {
            alert(`Password must be at least 8 characters.`);
        } else if (!this.state.adminCode) {
            alert(`Please fill out an admin code.`);
        } else {
            const data = {
                kind: this.state.kind,
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                avatar: this.state.avatar,
                adminCode: this.state.adminCode
            }

            signUpAdmin(data)
                .then(data => {
                    this.clearAllFields();
                    this.unload();
                    this.props.history.push('/');
                })
                .catch(e => {
                    alert('You cannot be signed up at this time.');
                    this.unload();
                })
        }
    }

    render() {
        return (
            <div className={classes.AdminSignUpPage}>
                <div className={classes.header}>
                    <div className={classes.title}>Admin Sign Up</div>
                    {this.state.loading ? <CircularProgress color="primary" size={25} /> : null}
                </div>

                <form encType="multipart/form-data">
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
                            <TextField label="Email"
                                name="email"
                                required
                                value={this.state.email}
                                margin="dense"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                        </Grid>

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
                                }}
                            />
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

                    <TextField label="Admin Code"
                        name="adminCode"
                        type={this.state.showAdminCode ? 'text' : 'password'}
                        required
                        margin="dense"
                        value={this.state.adminCode}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <IconButton onClick={this.clickShowAdminCode}>
                                    {this.state.showAdminCode ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }} />

                    <div className={classes.fileUpload}>
                        <div className={classes.label}>Avatar</div>
                        <FileUploader upload={this.fileUpload} />
                    </div>

                    <div className={classes.footer}>
                        <div className={classes.buttons}>
                            <Button content={'Sign Up'} click={this.submitForm} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminSignUpPage;

