import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import ProviderForm from '../../components/SignUpPage/ProviderForm/ProviderForm';
import InterpreterForm from '../../components/SignUpPage/InterpreterForm/InterpreterForm';
import classes from './SignUpPage.module.css'

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            showInterpreterForm: false
        }
    }

    onChangeCheckbox = e => {
        this.setState({ showInterpreterForm: e.target.value === "interpreter" })
    }

    render() {

        let form = <ProviderForm />;

        if (this.state.showInterpreterForm) {
            form = <InterpreterForm />;
        }

        return (
            <div>
                <div className={classes.userTypeSelector}>
                    <h1>I am a: </h1>
                    <FormControl component="fieldset">
                        {/* <FormLabel component="legend">I am a:</FormLabel> */}
                        <RadioGroup defaultValue="provider" onChange={this.onChangeCheckbox} aria-label="user type" name="user-radios">
                            <FormControlLabel value="provider" control={
                                <Radio
                                    disableRipple
                                    color="primary"
                                />}
                                label="provider" />
                            <FormControlLabel value="interpreter" control={
                                <Radio
                                    disableRipple
                                    color="primary"
                                    name="showInterpreterForm"
                                />}
                                label="interpreter" />
                        </RadioGroup>
                    </FormControl>
                </div>
                {form}
            </div>
        )
    }
}

export default SearchPage;