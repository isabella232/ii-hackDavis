import React, { Component } from 'react';

import classes from './css/AboutUsPage.module.css';

import Avatar from '../shared/Avatar';
import Paper from '../shared/Paper';

import avatar from '../../assets/test.jpg';

class AboutUsPage extends Component {
    constructor() {
        super();
        this.state = {
            items: [1, 2, 3]
        }
    }

    componentDidMount() {

    }

    render() {
        const items = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <div key={`about-us-card-${i}`}>
            <div className={classes.previewCard}>
                <Paper>
                    <div className={classes.cardContent}>
                        <Avatar name={'Moomin Azkaban'} avatar={avatar} size={15} />
                        <div className={classes.name}>Moomin Azkaban</div>
                    CEO
                    </div>
                </Paper>
            </div>
        </div>
        )

        return (
            <div className={classes.AboutUsPage}>
                <h1>hellow</h1>

                <div className={classes.previewSection}>
                    <div className={classes.title}>Meet Our Team</div>
                    <div className={classes.previewArea}>
                        {items}
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUsPage;
