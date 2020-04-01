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
            emailMatch: true,
            password: "",
            repeatPassword: "",
            passwordMatch: true,
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

        // form validation for email & passwords
        if (e.target.name === "repeatPassword"){
            if (e.target.value !== this.state.password){
                this.setState({passwordMatch: false})
            }
            else{
                this.setState({passwordMatch: true})
            }
        }
        if (e.target.name === "repeatEmail"){
            if (e.target.value !== this.state.email){
                this.setState({emailMatch: false})
            }
            else{
                this.setState({emailMatch: true})
            }
        }
    }

    clearForm = (e) => {
        document.getElementById("new-provider").reset();
    }

    createUser = () => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin
        }
        console.log(data)
        signUpProvider(data)
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
                <form encType="multipart/form-data" id="new-provider">
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
                                onChange={this.changeInput}
                                error = {!this.state.emailMatch}
                                helperText = {this.state.emailMatch ? "":"Please make sure emails match"} />
                            </div>
                            <div className={classes.passwordCol}>
                                <TextField label="Password"
                                name="password"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                type="password"
                                onChange={this.changeInput} />

                                <TextField label="Confirm Password"
                                name="repeatPassword"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                type="password"
                                onChange={this.changeInput}
                                error = {!this.state.passwordMatch}
                                helperText = {this.state.passwordMatch ? "":"Please make sure passwords match"} />
                            </div>
                        </div>
                    </div>
                </form>
                <div className={classes.actions}>
                    <Button content='Clear' inverted click={this.clearForm}/>
                    <Button content='Sign Up' click={this.createUser} />
                </div>
            </div>
        );
    }
}

export default ProviderForm;
