import React, { Component } from 'react';

import classes from './css/AboutUsPage.module.css';

import Avatar from '../shared/Avatar';
import Paper from '../shared/Paper';

import avatar from '../../assets/test_avatar.jpeg';

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
                    <p>
                            Rocio Hernandez Cruz is an indigenous woman from Oaxaca who migrated to the U.S at the age of 12. She has recently graduated from the University of California Santa Cruz with a BA in Latin American and Latino Studies and a minor in education, becoming a part of the class of 2020. Rocio is looking forward to continuing graduate school in the near future. In the Santa Cruz community, Rocio became a part of the non-profit organization Senderos. An organization that focuses on offering services to young students that revolve around indigenous Oaxacan culture. As a part of this community she attended several events to volunteer and participated as a dancer in their Centeotle Danza y Baile dance team.

                    </p>
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
                <Paper>
                    hl
                </Paper>

            </div>
        )
    }
}

export default AboutUsPage;
