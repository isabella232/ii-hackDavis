import React, { Component } from 'react';
import { Transition } from "react-transition-group";

import classes from './css/AboutUsPage.module.css';

import Grid from '@material-ui/core/Grid/Grid';

import Chip from './Chip';
import Paper from '../shared/Paper';
import SlantedSection from './SlantedSection';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

class AboutUsPage extends Component {
    constructor() {
        super();
        this.state = {
            curBio: 0,
            show: true
        }

        this.changeBio = this.changeBio.bind(this);
    }

    changeBio = (index) => {
        this.setState({ show: false });
        setTimeout(() => {
            this.setState({ show: true, curBio: index });
        }, 300)
    }

    render() {
        const text1 = <p>{`Spicy jalapeno bacon ipsum dolor amet porchetta tri-tip shoulder, capicola pig cow beef. Cow drumstick meatball, picanha alcatra buffalo turducken chicken. Ham pork chop swine ground round. T-bone tenderloin rump picanha. Porchetta tail fatback salami ball tip filet mignon. Beef pork belly ball tip jerky t-bone. Filet mignon bresaola jowl, chuck boudin spare ribs biltong.\n
        Meatloaf ground round strip steak ham pig cow hamburger shoulder. Turducken pig tenderloin beef ribs kevin ground round alcatra tail boudin andouille fatback cupim. Picanha andouille chuck sausage, bacon pork loin turducken ham cupim swine t-bone kevin buffalo. Andouille alcatra jerky spare ribs leberkas chuck shoulder beef ribs capicola picanha hamburger.\n
        Landjaeger t-bone cupim beef. Hamburger cupim prosciutto swine fatback drumstick flank chicken bacon buffalo pork loin kielbasa short loin ham spare ribs. Pork short loin shankle ball tip ham, filet mignon pork loin strip steak salami. Cupim pork loin turducken ham hock porchetta filet mignon. Rump alcatra prosciutto, spare ribs boudin capicola frankfurter short ribs andouille salami. Cupim frankfurter boudin bacon tongue beef short loin leberkas drumstick ribeye turkey brisket tail.\n
        Prosciutto ham short loin tongue turkey. Burgdoggen venison chicken salami shoulder shankle porchetta. Pork shankle brisket pork chop, kielbasa cow boudin spare ribs short ribs tail. Salami chislic meatball andouille buffalo biltong.\n
        Brisket kielbasa burgdoggen turkey pastrami beef ribs frankfurter, bresaola pork belly bacon cow swine sirloin jowl beef. Beef prosciutto salami, pig pork chop leberkas rump spare ribs. Flank meatball tail corned beef, shoulder jerky filet mignon. Chicken picanha corned beef chuck sirloin porchetta beef ribs. Burgdoggen fatback ground round, turducken pork belly prosciutto meatball short loin drumstick spare ribs pig sirloin leberkas bresaola.\n
        Turducken cupim buffalo corned beef shoulder. Prosciutto sausage pork chop fatback tail venison meatball beef ribs pancetta. Alcatra tail tenderloin tri-tip drumstick frankfurter landjaeger brisket ham hock. Turducken hamburger flank biltong, prosciutto spare ribs bresaola andouille doner pork loin picanha. Cow buffalo alcatra salami, flank tenderloin fatback leberkas ball tip shankle strip steak pork loin tail.`}</p>;

        const text2 = <p>{`Spicy jalapeno bacon ipsum dolor amet salami andouille beef, short ribs chuck ball tip brisket ground round pork chop flank pancetta t-bone. Beef ribs ribeye sausage ground round short ribs pork loin capicola. Flank brisket beef pastrami meatball. Biltong prosciutto cow, sirloin meatball cupim salami fatback meatloaf chislic short ribs. Picanha burgdoggen short ribs meatball hamburger. Cow leberkas andouille, beef ham alcatra meatloaf pork loin turducken flank chislic meatball.
        Tail meatloaf jowl burgdoggen ham hock chislic short ribs capicola alcatra andouille. Short loin swine ball tip andouille shank t-bone. Drumstick tenderloin buffalo sausage boudin. Ribeye pork frankfurter bresaola jowl filet mignon.
        Corned beef pastrami alcatra tongue. Ground round corned beef buffalo sausage bacon fatback, cow bresaola chicken ball tip cupim burgdoggen beef ribs jerky. Beef ribs buffalo boudin meatball turkey beef drumstick pork. Drumstick chislic kielbasa andouille pastrami flank. Pork chop tail ham, turducken prosciutto pancetta alcatra short ribs burgdoggen fatback swine pork belly. Spare ribs jerky ham hock tongue, prosciutto strip steak bacon tail buffalo doner pork fatback flank.
        Hamburger salami pork belly kielbasa tri-tip kevin filet mignon brisket turkey swine. Leberkas jerky bresaola turkey flank strip steak kielbasa. Kevin pig pork chop pancetta meatball strip steak fatback ham frankfurter beef ribs pork belly andouille meatloaf. Tongue doner flank, turkey pork brisket ham hock ham. Meatloaf short loin fatback ribeye shoulder, salami pork belly burgdoggen turkey ground round brisket beef ribs pastrami ham short ribs.
        Tongue kielbasa andouille sausage short loin cow short ribs. Shoulder short ribs spare ribs ham hock jerky pastrami drumstick picanha cow. Sirloin tail pig, corned beef beef ribs short ribs kevin spare ribs doner. T-bone leberkas rump, jowl chicken beef capicola chislic biltong ball tip ham. Drumstick short loin turkey kielbasa. Cow beef swine picanha. Short ribs shoulder ball tip prosciutto tenderloin shank spare ribs.`}</p>;

        const bios = [text1, text2, text1, text2, text1, text2];

        return (
            <div className={classes.AboutUsPage}>
                <div className={classes.previewSection}>
                    <div className={classes.title}>Meet Our Team</div>
                </div>

                <SlantedSection>
                    <Grid container spacing={0} justify='center'>
                        <Grid item sm={12} md={6} lg={6}>
                            <div className={classes.avatarSection}>
                                <Grid container spacing={0} justify='center'>
                                    <Grid item xs={4} sm={4}>
                                        <Chip name={"Moomin"} index={0} click={this.changeBio}
                                            avatar={"https://static.dribbble.com/users/744745/screenshots/5916538/new_profile_pic.jpg"} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={"Moomin"} index={1} click={this.changeBio}
                                            avatar={"https://static.dribbble.com/users/744745/screenshots/5916538/new_profile_pic.jpg"} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={"Moomin"} index={2} click={this.changeBio}
                                            avatar={"https://static.dribbble.com/users/744745/screenshots/5916538/new_profile_pic.jpg"} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={"Moomin"} index={3} click={this.changeBio}
                                            avatar={"https://static.dribbble.com/users/744745/screenshots/5916538/new_profile_pic.jpg"} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={"Moomin"} index={4} click={this.changeBio}
                                            avatar={"https://static.dribbble.com/users/744745/screenshots/5916538/new_profile_pic.jpg"} />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item sm={12} md={6} lg={6}>
                            <div className={classes.bioSection}>
                                <div className={classes.bio}>
                                    <Paper bio>

                                        <Transition in={this.state.show} timeout={duration}>
                                            {state => (
                                                <div style={{
                                                    ...defaultStyle,
                                                    ...transitionStyles[state]
                                                }}>
                                                    {bios[this.state.curBio]}
                                                </div>
                                            )}
                                        </Transition>

                                    </Paper>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                </SlantedSection>
            </div >
        )
    }
}

export default AboutUsPage;
