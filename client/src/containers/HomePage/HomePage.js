import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import classes from './HomePage.module.css';

import Avatar from '../../components/shared/Avatar/Avatar';
import PreviewCard from '../../components/HomePage/PreviewCard/PreviewCard';

import { fetchHome } from '../../services/HomeService';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            quote: {},
            interpreters: []
        }
    }

    componentDidMount() {
        fetchHome()
            .then(data => {
                this.setState({
                    quote: data.quote,
                    interpreters: data.interpreters
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const previews = this.state.interpreters.map(interpreter =>
            <div className={classes.previewCard}>
                <PreviewCard name={interpreter.name}
                    avatar={interpreter.avatar}
                    languages={interpreter.languages}
                    email={interpreter.email}
                    location={interpreter.location}
                    rating={interpreter.rating} />
            </div>
        );

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

                {this.state.quote ?
                    <div className={classes.invertedSection}>
                        <div className={classes.quote}>
                            "{this.state.quote.quote}"
                    </div>
                        <div className={classes.author}>
                            <Avatar name={this.state.quote.authorName} avatar={this.state.quote.avatar} size={7} />

                            <div>
                                <div className={classes.infoItem}>
                                    <strong>{this.state.quote.authorName}</strong>
                                </div>
                                <div className={classes.infoItem}>
                                    {this.state.quote.location}
                                </div>
                            </div>
                        </div>
                    </div> : null
                }

                <div className={classes.section}>
                    <Grid container spacing={2} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.title}>Never Easier To Find An Interpreter</div>
                            <p>Need an indigenous interpreter? Just look for the language you need on our map and we will take care of the rest.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img src='https://cdn.dribbble.com/users/799185/screenshots/7085057/media/85e47d49c4557e920ff245c8ebbea08b.png' alt='illustration2' className={classes.image} />
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.previewSection}>
                    <div className={classes.previewHeader}>
                        <div className={classes.title}>Find An Interpreter</div>
                        <div>You can look up interpreters by name, languages, location...</div>
                    </div>
                    <div className={classes.previewArea}>
                        {previews}
                    </div>
                </div>

                <div className={classes.section}>
                    <Grid container spacing={4} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>Who Are We?</div>
                            <p>Multilingual Indigenous Interpreters (MII) is a collective of trilingual youth and youth adults from Guatemala and Oaxaca whose main purpose is to bridge the language gaps between service providers and monolingual indigenous communities from Latin America. Interpreters from this collective reside throughout the state of California, with a focal concentration in Oakland, CA. The interpreters are trilingual and are proficient in Spanish, English, and their native languages; Zapoteco, Mam, and Mixteco. The objective of MII is to remove the language barriers that monolingual indigenous communities experience when accessing services, understanding and advocating for their civil rights in hospitals and immigration courts, as well as raise awareness about the growing indigenous communities migrating to the U.S. who only speak their indigenous languages.<br />
                                Our mission is to serve monolingual Indigenous communities by providing adequate and accurate interpreting services to best fit the needs of our indigenous communities, building language and cultural understanding. Our vision is to eliminate language barriers between indigenous language speakers and their service providers for the dignity, respect, and equitable representation of indigenous communities.</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>What Do We Do?</div>
                            <p>Multilingual Indigenous Interpreters provides high quality interpreting services to monolingual indigenous communities with the ultimate goal to provide accurate and efficient interpreting services and breach the communication gap between service providers and indigenous communities.
                            We offer relay, simultaneous and consecutive interpretation in multiple indigenous languages such as Mam from Guatemala, Zapotec and Mixtec from Oaxaca, Mexico. We focus on promoting direct interpretation from indigenous languages to English for better and adequate communication.</p>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div className={classes.title}>Join Us!</div>
                            <p>To support us on our mission just sing up as an interpreter, or service provider and offer your best services with qualified interpreters.</p>
                        </Grid>
                    </Grid>
                </div>
            </div >
        )
    }
}

export default HomePage;
