import React, { Component } from 'react';

import SignUpForm from '../../components/SignUpPage/SignUpForm/SignUpForm';
import classes from './SignUpPage.module.css'

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {

        return (
            <div>
                <SignUpForm className={classes.form}/>
            </div>
        )
    }
}

export default SearchPage;