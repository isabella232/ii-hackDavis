import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import classes from './SignUpForm.module.css';
import StyledTextField from '../../shared/StyledTextField/StyledTextField';
import Button from '../../shared/Button/Button';

import InterpreterForm from '../InterpreterForm/InterpreterForm';
import { signUp } from '../../../services/SignUpService';


class SignUpForm extends Component {
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

    onChangeCheckbox = e => {
        this.setState({ showInterpreterForm: e.target.value === "interpreter" })
        console.log(e.target.value)
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
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
        signUp(this.state.id, data)
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
        let sif = null;

        if (this.state.showInterpreterForm) {
            sif = <InterpreterForm />;
            // you also have to append this to the form somehow
            // like append the state
        }

        return (

            <div>
                <h1>Sign Up</h1>
                <form encType="multipart/form-data">
                    <div className={classes.signUpForm}>
                        <div className={classes.userType}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">I am a:</FormLabel>
                                <RadioGroup defaultValue="provider" onChange={this.onChangeCheckbox} aria-label="user type" name="user-radios">
                                    <FormControlLabel value="provider" control={
                                        <Radio
                                            disableRipple
                                            color="primary"
                                        />}
                                        label="provider" />
                                    <FormControlLabel value="interpreter" control={
                                        <Radio
                                            // onChange={this.onChangeCheckbox}
                                            disableRipple
                                            color="primary"
                                            name="showInterpreterForm"
                                        />}
                                        label="interpreter" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className={classes.fields}>
                            <div className={classes.nameEmailCol}>
                                {/* <StyledTextField content={"Name"} />
                                <StyledTextField content={"Email"} />
                                <StyledTextField content={"Confirm Email"} /> */}
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
                                {/* <StyledTextField content={"Password"} />
                                <StyledTextField content={"Confirm Password"} /> */}
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
                    {sif}
                </form>
                <div className={classes.actions}>
                    <Button content="Clear" inverted />
                    <Button content='Sign Up' click={this.createUser} />
                </div>
            </div>
        );
    }
}

export default SignUpForm;
