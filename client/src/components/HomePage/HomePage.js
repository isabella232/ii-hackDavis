import React, { Component } from 'react';
import classes from './css/HomePage.module.css';

import Grow from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import InstagramIcon from '@material-ui/icons/Instagram';

import SlantedCard from './SlantedCard';
import PreviewCard from './PreviewCard';

import { fetchHome } from '../../services/HomeService';

import group from '../../assets/group.jpg';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            interpreters: [],
            quotes: [{ show: false, next: 1 },
            { show: false, next: 2 },
            { show: false, next: 3 },
            { show: false, next: 4 },
            { show: false, next: 5 },
            { show: false, next: 0 }],
            nextQuote: Math.floor(Math.random() * 6),
            phrases: [{ show: false, next: 1 },
            { show: false, next: 2 },
            { show: false, next: 3 },
            { show: false, next: 0 }],
            nextPhrase: Math.floor(Math.random() * 4),
        }
    }

    componentDidMount() {
        fetchHome()
            .then(data => {
                this.setState({
                    interpreters: data.interpreters
                })
            })
            .catch(error => {
                console.log(error);
            })
        this.changePhrase();
        this.changeQuote();
    }

    changePhrase = () => {
        const newState = this.state;
        newState.phrases[this.state.nextPhrase].show = false;
        const next = this.state.phrases[this.state.nextPhrase].next;
        newState.phrases[next].show = true;
        newState.nextPhrase = next;
        this.setState({ newState });
        setTimeout(this.changePhrase, 10000);
    }

    changeQuote = () => {
        const newState = this.state;
        newState.quotes[this.state.nextQuote].show = false;
        const next = this.state.quotes[this.state.nextQuote].next;
        newState.quotes[next].show = true;
        newState.nextQuote = next;
        this.setState({ newState });
        setTimeout(this.changeQuote, 15000);
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
                    <Grid container spacing={0} justify='center' alignItems='center'>
                        <Grid item xs={12} sm={5} md={6}>
                            <div className={classes.title}>Never Easier To Find An Interpreter</div>
                            <p>Need an indigenous interpreter? Just look for the language you need on our map and we will take care of the rest.</p>
                        </Grid>
                        <Grid item xs={12} sm={7} md={6}>
                            <SlantedCard alt={'illustration'} src={group} />
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.invertedSection}>
                    {this.state.quotes[0].show ?
                        <Grow in={this.state.quotes[0].show}>
                            <div className={classes.centeredQuote}>
                                "Bringing the skills for you to better communicate in the comfort of your native language."
                            </div>
                        </Grow> : null}
                    {this.state.quotes[1].show ?
                        <Grow in={this.state.quotes[1].show}>
                            <div className={classes.centeredQuote}>
                                "As members of monolingual indifenous communities, we understand your struggles."
                            </div>
                        </Grow> : null}
                    {this.state.quotes[2].show ?
                        <Grow in={this.state.quotes[2].show}>
                            <div className={classes.centeredQuote}>
                                "Doctors are your life savers, lawyers are your advocates, we translators and interpreters are your voice."
                            </div>
                        </Grow> : null}
                    {this.state.quotes[3].show ?
                        <Grow in={this.state.quotes[3].show}>
                            <div className={classes.centeredQuote}>
                                "An indigenous interpreter is a bridge that connects with their community to meet their needs."
                            </div>
                        </Grow> : null}
                    {this.state.quotes[4].show ?
                        <Grow in={this.state.quotes[4].show}>
                            <div className={classes.centeredQuote}>
                                "A strong woman is soft and powerful."
                            </div>
                        </Grow> : null}
                    {this.state.quotes[5].show ?
                        <Grow in={this.state.quotes[5].show}>
                            <div className={classes.centeredQuote}>
                                "Our voice is your voice. We provide equitable interpretation to make sure you all get heard!"
                            </div>
                        </Grow> : null}
                </div>

                <div className={classes.previewSection}>
                    <div className={classes.previewHeader}>
                        <div className={classes.title}>Find An Interpreter</div>
                        <div>You can look up interpreters by name, languages, location...</div>
                    </div>
                    <div className={classes.previewArea}>
                        {previews ? previews : null}
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
                    <Grid container spacing={4} justify='center' alignItems='flex-start'>
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
