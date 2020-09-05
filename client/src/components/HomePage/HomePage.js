import React, { Component } from 'react';
import classes from './css/HomePage.module.css';

import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';

import Avatar from '../shared/Avatar';
import SlantedCard from './SlantedCard';
import PreviewCard from './PreviewCard';

import { fetchHome } from '../../services/HomeService';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            quote: {},
            interpreters: [],
            phrases: [{ show: false, next: 1 },
            { show: false, next: 2 },
            { show: false, next: 3 },
            { show: false, next: 0 }],
            nextPhrase: Math.floor(Math.random() * 4)
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
        this.changePhrase();
    }

    changePhrase = () => {
        const newState = this.state;
        newState.phrases[this.state.nextPhrase].show = false;
        const next = this.state.phrases[this.state.nextPhrase].next;
        newState.phrases[next].show = true;
        newState.nextPhrase = next;
        this.setState({ newState });
        setTimeout(this.changePhrase, 30000);
    }

    render() {
        const previews = this.state.interpreters.map((interpreter, i) =>
            <div className={classes.previewCard} key={`home-preview-card-${i}`}>
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
                            <div className={classes.title}>Never Easier To Find An Interpreter</div>
                            <p>Need an indigenous interpreter? Just look for the language you need on our map and we will take care of the rest.</p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <SlantedCard alt={'illustration'} src={"https://static.dribbble.com/users/355826/screenshots/6187414/image.png"} />
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
                    </div> : null}

                <div className={classes.previewSection}>
                    <div className={classes.previewHeader}>
                        <div className={classes.title}>Find An Interpreter</div>
                        <div>You can look up interpreters by name, languages, location...</div>
                    </div>
                    <div className={classes.previewArea}>
                        {previews}
                    </div>
                </div>

                <div className={classes.invertedSection}>
                    {this.state.phrases[0].show ?
                        <Grow in={this.state.phrases[0].show}>
                            <div className={classes.centeredQuote}>
                                Your Voice Matters
                            </div>
                        </Grow> : null}
                    {this.state.phrases[1].show ?
                        <Grow in={this.state.phrases[1].show}>
                            <div className={classes.centeredQuote}>
                                There Is Power In Your Voice
                            </div>
                        </Grow> : null}
                    {this.state.phrases[2].show ?
                        <Grow in={this.state.phrases[2].show}>
                            <div className={classes.centeredQuote}>
                                A Pleasure To Serve Your Needs
                            </div>
                        </Grow> : null}
                    {this.state.phrases[3].show ?
                        <Grow in={this.state.phrases[3].show}>
                            <div className={classes.centeredQuote}>
                                We Are A Part Of Our Community
                            </div>
                        </Grow> : null}
                </div>

                <div className={classes.infoSection}>
                    <Grid container spacing={4} justify='center' alignItems='start'>
                        <Grid item xs={12} sm={3}>
                            <div className={classes.title}>What Do We Do?</div>
                            <p>Multilingual Indigenous Interpreters provides high quality relay, simultaneous and consecutive  interpreting services to monolingual indigenous communities with the ultimate goal to make accurate communication accessible and breach the communication gap between service providers and indigenous communities.</p>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <div className={classes.title}>Who Are We?</div>
                            <p>Multilingual Indigenous Interpreters (MII), founded in 2019, is a collective of trilingual young adults from Guatemala and Oaxaca whose main purpose is to eliminate the language barriers between service providers and monolingual indigenous speakers from Latin America. Our collective was founded out of the necessity to support indigenous interpreters with their professional development and capacity building when non-indgenous interpreting agencies were lacking to support this need.</p>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <div className={classes.title}>Our Missions</div>
                            <p>Our mission is to provide adequate and accurate interpreting services to best fit the needs of monolingual indigenous communities and bridge cultural understanding between service providers and clients.  Our vision is to eliminate language barriers for the dignity, respect, and equitable representation of indigenous communities.</p>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.joinSection}>
                    <div className={classes.previewHeader}>
                        <div className={classes.title}>Join Us!</div>
                        <p>To support us on our mission just sign up as an interpreter, or service provider and offer your best services with qualified interpreters.</p>

                        <a href="mailto: caindigenousinterpreters@gmail.com" target=" _blank">
                            <IconButton className={classes.icon}>
                                <MailIcon color="primary" fontSize='large' />
                            </IconButton>
                        </a>
                        <a href="https://www.instagram.com/tuvoz_interpreters/" target=" _blank">
                            <IconButton className={classes.icon}>
                                <InstagramIcon color="primary" fontSize='large' />
                            </IconButton>
                        </a>
                    </div>
                </div>
            </div >
        )
    }
}

export default HomePage;
