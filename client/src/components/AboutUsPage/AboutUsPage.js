import React, { Component } from 'react';

import classes from './css/AboutUsPage.module.css';

import Avatar from '../shared/Avatar';

class AboutUsPage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={classes.AboutUsPage}>
                <h1>hellow</h1>

                <div className={classes.teamArea}>

                </div>
            </div>
        )
    }
}

export default AboutUsPage;
