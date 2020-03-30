import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import classes from './ProviderForm.module.css';
import StyledTextField from '../../shared/StyledTextField/StyledTextField';
import Button from '../../shared/Button/Button';

import InterpreterForm from '../InterpreterForm/InterpreterForm';
import { signUpProvider } from '../../../services/SignUpService';


class ProviderForm extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            showInterpreterForm: false,
            name: "",
            email: "",
            repeatEmail: "",
            password: "",
            repeatPassword: "",
            username: "",
            isAdmin: false,
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name === "repeatPassword"){
            this.checkPasswords();
        }
        if (e.target.name === "repeatEmail"){
            this.checkCheckEmails();
        }
    }

    checkPasswords() {
        if (this.state.repeatPassword !== this.state.password){
            this.errors.push("Please make sure passwords match");
        }
    }

    checkEmails() {
        if (this.state.repeatEmail !== this.state.email){
            this.errors.push("Please make sure emails match");
        }
    }

    createUser = () => {
        // check that all fields are filled

        const data = {
            name: this.state.name,
            email: this.state.email,
            repeatEmail: this.state.repeatEmail,
            password: this.state.comment,
            repeatPassword: this.state.repeatPassword,
            username: this.state.username,
            isAdmin: this.state.isAdmin
        }
        signUpProvider(this.state.id, data)
            .then(data => {
                // display thanks for signing up message
                // send email
            })
            .catch(e => {
                alert("Please fix any errors", e);
                console.log(e)
            });
    }

    render() {

        return (

            <div>
                <h1>Account Information</h1>
                <form encType="multipart/form-data">
                    <div className={classes.signUpForm}>
                        <div className={classes.fields}>
                            <div className={classes.nameEmailCol}>
                                <TextField label="Full Name"
                                name="name"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                                
                                <TextField label="Email"
                                name="email"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />

                                <TextField label="Confirm Email"
                                name="repeatEmail"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                            </div>
                            <div className={classes.passwordCol}>
                                <TextField label="Password"
                                name="password"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />

                                <TextField label="Confirm Password"
                                name="repeatPassword"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className={classes.actions}>
                    <Button content="Clear" inverted />
                    <Button content='Sign Up' click={this.createUser} />
                </div>
            </div>
        );
    }
}

export default ProviderForm;
