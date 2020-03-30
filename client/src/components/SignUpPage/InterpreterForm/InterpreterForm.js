import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import classes from './InterpreterForm.module.css';
import StyledTextField from '../../shared/StyledTextField/StyledTextField';
import ProviderForm from '../ProviderForm/ProviderForm';
import Button from '../../shared/Button/Button';
import { signUpInterpreter } from '../../../services/SignUpService';


class InterpreterForm extends Component {
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
            location: "",
            language: [],
            englishFluency: "",
            certifications: [],
            errors: {}
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.setState({ open: this.props.open });
        }
    }

    clearForm = (e) => {
        document.getElementById("new-interpreter").reset();
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });

        // form validation for email & passwords
        if (e.target.name === "repeatPassword") {
            if (e.target.value !== this.state.password) {
                this.setState({ passwordMatch: false })
            }
            else {
                this.setState({ passwordMatch: true })
            }
        }
        if (e.target.name === "repeatEmail") {
            if (e.target.value !== this.state.email) {
                this.setState({ emailMatch: false })
            }
            else {
                this.setState({ emailMatch: true })
            }
        }
    }

    createUser = () => {
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin,
            location: {
                locationString: this.state.location
            },
            language: this.state.language,
            englishFluency: this.state.englishFluency,
            certifications: this.state.certifications
        }
        console.log(data)
        signUpInterpreter(this.state.id, data)
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
            <div className={classes.InterpreterForm}>
                <h1>Account Information</h1>
                <form encType="multipart/form-data" id="new-interpreter">
                    <div className={classes.accountInfo}>
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
                    <h1>Location</h1>
                    <div className={classes.fields}>
                        <TextField label="Location"
                            name="location"
                            required
                            value={this.props.title}
                            margin="none"
                            fullWidth
                            variant="outlined"
                            onChange={this.changeInput} />
                    </div>
                    <h1>Languages</h1>
                    <div className={classes.LangFields}>
                        <div className={classes.LangField}>
                            <TextField label="Language"
                                name="language"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                        </div>
                        <div className={classes.LangFluencyField}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel>Fluency</InputLabel>
                                <Select
                                    native
                                    value={this.props.engFluency}
                                    label="Fluency"
                                    inputProps={{
                                        name: 'fluency',
                                        id: 'fluency',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Service</InputLabel>
                        <Select
                            native
                            value={this.props.service}
                            label="Service"
                            inputProps={{
                                name: 'serice',
                                id: 'service',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"simultaneous"}>simultaneous</option>
                            <option value={"type 2"}>type 2</option>
                            <option value={"type 3"}>type 3</option>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">English Fluency</InputLabel>
                        <Select
                            native
                            value={this.props.engFluency}
                            label="English Fluency"
                            inputProps={{
                                name: 'englishFluency',
                                id: 'englishFluency',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Select>
                    </FormControl>
                    <h1>Certifications</h1>
                    <div className={classes.Records}>
                        <div className={classes.RecordName}>
                            <TextField label="Certification Name"
                                name="title"
                                required
                                value={this.props.title}
                                margin="none"
                                fullWidth
                                variant="outlined"
                                onChange={this.changeInput} />
                        </div>
                        <div className={classes.RecordFile}>
                            <p>insert file to upload</p>
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


export default InterpreterForm;