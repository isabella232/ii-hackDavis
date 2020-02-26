import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import classes from './HomePage.module.css';

import Avatar from '../../components/shared/Avatar/Avatar';
import PreviewCard from '../../components/HomePage/PreviewCard';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            avatar: 'https://cdn.dribbble.com/users/862175/screenshots/5818050/4_illustrations_january_marta.jpg',
            name: 'Moomin Azkaban',
            location: 'Davis, CA',
            interpreters: [
                {
                    name: 'Moomin Azkaban',
                    avatar: 'https://cdn.dribbble.com/users/862175/screenshots/5818050/4_illustrations_january_marta.jpg',
                    languages: ['Spanish', 'English'],
                    email: 'mooaz@gmail.com',
                    degree: 'B.S. in Communication',
                    location: 'Davis, CA'
                }
            ]
        }
    }

    render() {
        const interpreter = this.state.interpreters[0];
        return (
            <div className={classes.HomePage}>
                <div className={classes.section}>
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={6}>
                            <img src='https://cdn.dribbble.com/users/799185/screenshots/8569374/media/6fbbdb4b3e53f791a8868ee9cc87a5af.png' alt='illustration1' className={classes.image} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <div className={classes.title}>Changing the Way We Communiate</div>
                            <p>Bacon ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet.</p>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.invertedSection}>
                    <div className={classes.quote}>
                        "Thanks to Indigenous Interpreters, I found just the help that I needed."
                    </div>
                    <div className={classes.author}>
                        <Avatar name={this.state.name} avatar={this.state.avatar} size={7} />

                        <div>
                            <div className={classes.infoItem}>
                                <strong>{this.state.name}</strong>
                            </div>
                            <div className={classes.infoItem}>
                                {this.state.location}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.section}>
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.title}>Never Easier To Find An Interpreter</div>
                            <p>Bacon ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img src='https://cdn.dribbble.com/users/799185/screenshots/7085057/media/85e47d49c4557e920ff245c8ebbea08b.png' alt='illustration2' className={classes.image} />
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.section}>
                    <div className={classes.title}>Find An Interpreter</div>
                    <div>You can look up interpreters by name, languages, location...</div>
                    <div className={classes.previewArea}>
                        <div className={classes.previewCard}>
                            <PreviewCard name={interpreter.name}
                                avatar={interpreter.avatar}
                                languages={interpreter.languages}
                                email={interpreter.email}
                                location={interpreter.location} />
                        </div>
                    </div>
                </div>

                <div className={classes.section}>
                    <Grid container spacing={4} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>Who Are We?</div>
                            <p>Bacon ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet.</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>What Do We Do?</div>
                            <p>Bacon ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet.</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>How To Get Involved?</div>
                            <p>Bacon ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet ipsum dolor amet sausage turducken shankle filet.</p>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default HomePage;
