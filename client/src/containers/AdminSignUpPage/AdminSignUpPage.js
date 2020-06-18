import React, { Component } from 'react';
import classes from './AdminSignUpPage.module.css';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Button from '../../components/shared/Button/Button';
import FileUploader from '../../components/shared/FileUploader/FileUploader';
import { signUpAdmin } from '../../services/AdminService';

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
            adminCode: ''
        }

        this.changeInput = this.changeInput.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

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
        if (!this.state.email) {
            alert(`Please fill out your email.`);
        } else if (!this.state.password) {
            alert(`Please fill out your password.`);
        } else if (!this.state.avatar) {
            alert(`Please upload your avatar.`);
        } else if (this.state.password !== this.state.confirmPassword) {
            alert(`Please check your password.`);
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
                    alert('Successfully signed up as admin.')
                    this.clearAllFields();
                    this.props.history.push('/');
                })
                .catch(e => {
                    alert('You cannot be signed up at this time.');
                })
        }
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.title}>Admin Sign Up</div>
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
                                type="password"
                                required
                                margin="dense"
                                value={this.state.password}
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
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
                        required
                        margin="dense"
                        value={this.state.adminCode}
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />

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

