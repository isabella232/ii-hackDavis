import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import classes from './InterpreterForm.module.css';
import StyledTextField from '../../shared/StyledTextField/StyledTextField';
import ProviderForm from '../ProviderForm/ProviderForm';
import Button from '../../shared/Button/Button';


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
            errors: {}
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {


        return (
            <div className={classes.InterpreterForm}>
                <h1>Account Information</h1>
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
                    {/* <StyledTextField content={"Location"} /> */}
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
                        {/* <StyledTextField content={"Language"} /> */}
                        <TextField label="Language"
                            name="langField"
                            required
                            value={this.props.title}
                            margin="none"
                            fullWidth
                            variant="outlined"
                            onChange={this.changeInput} />
                    </div>
                    <div className={classes.LangFluencyField}>
                        {/* <StyledTextField content={"Fluency"} /> */}
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-age-native-simple">English Fluency</InputLabel>
                            <Select
                                native
                                value={this.props.engFluency}
                                label="English Fluency"
                                inputProps={{
                                    name: 'English Fluency',
                                    id: 'outlined-age-native-simple',
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
                {/* <StyledTextField content={"Type of Interpreting"} />
                <StyledTextField content={"English Fluency"} /> */}
                <TextField label="Type of Interpreting"
                    name="TypeOfInterpreting"
                    required
                    value={this.props.title}
                    margin="none"
                    fullWidth
                    variant="outlined"
                    onChange={this.changeInput} />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">English Fluency</InputLabel>
                    <Select
                        native
                        value={this.props.engFluency}
                        label="English Fluency"
                        inputProps={{
                            name: 'English Fluency',
                            id: 'outlined-age-native-simple',
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
                <h1>Records</h1>
                <div className={classes.Records}>
                    <div className={classes.RecordName}>
                        <TextField label="Record Name"
                            name="recordName"
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
                <div className={classes.actions}>
                    <Button content="Clear" inverted />
                    <Button content='Sign Up' click={this.createUser} />
                </div>
            </div>
        );
    }
}


export default InterpreterForm;