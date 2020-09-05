import React, { Component } from 'react';

import classes from './css/AboutUsPage.module.css';

import SlantedSection from './SlantedSection';

class AboutUsPage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {

        return (
            <div className={classes.AboutUsPage}>
                <div className={classes.previewSection}>
                    <div className={classes.title}>Meet Our Team</div>
                </div>

                <SlantedSection>
                    <h1>hellow</h1>
                </SlantedSection>
            </div>
        )
    }
}

export default AboutUsPage;
