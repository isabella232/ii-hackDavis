import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import classes from './InterpreterForm.module.css';
import StyledTextField from '../../shared/StyledTextField/StyledTextField';


class InterpreterForm extends Component {
    constructor(props) {
        super();
        this.state = {

        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className={classes.InterpreterForm}>
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
                        <StyledTextField content={"Record Name"} />
                    </div>
                    <div className={classes.RecordFile}>
                        <p>insert file to upload</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default InterpreterForm;