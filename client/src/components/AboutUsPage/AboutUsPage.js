import React, { Component } from 'react';
import { Transition } from "react-transition-group";

import classes from './css/AboutUsPage.module.css';
import alejandra from '../../assets/alejandra.jpg';
import damaso from '../../assets/damaso.jpg';
import leonor from '../../assets/leonor.jpg';
import linda from '../../assets/linda.png';
import luis from '../../assets/luis.jpg';
import martin from '../../assets/martin.jpg';
import rocio from '../../assets/rocio.jpg';

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
            show: true,
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
        // const text1 = <p>{`Alejandra Matias Ramos was born in Todos Santos, Guatemala to indigenous Mam parents. In 2004, her family migrated to the United States due to the increase in violence and poverty in \n 
        // their motherland and eventually set their roots in Oakland, CA. Alejandra is currently pursuing a Public Health Bachelor's degree from UC Merced. Since a young age, Alejandra has played the \n
        // role of an informal interpreter between her community and service providers. Now, as a trained indigenous interpreter, she seeks to be the bridge between service providers and \n
        // indigneous monolingual speakers, with a focus on providing services for medical health providers and their clients.`}</p>;

        // const text2 = <p>{`Damaso Calmo is an indigenous Mam speaker who seeks to support his community by identifying their needs and meeting them. Damaso migrated to Oakland, CA in his early teens \n 
        // and was able to learn English quickly in order to pursue a college degree.  Damaso gained experience as an interpreter and translator by supporting his Mam peers during the most \n
        // recent influx of recent arrivals from Central America to Oakland, CA as he saw the dire need to support them and help them adjust to their new community.  He is currently working as an \n
        // interpreter at La Clinic in Oakland, CA and his ongoing efforts to preserve indigenous Mayan Mam languages and traditions led him to found Desarollo Maya, an indigenous community network to uplift indignous Mayan \n
        // Mam voices in Oakland.  He is passionate about increasing access to qualified and trained indigenous interpreters, and through Multilingual Indigenous Interpreters, he seeks to close gaps that currently exist.`}</p>;

        // const text3 = <p>{`Leonor Mendoza was born and raised in San Martin Peras, Oaxaca where she grew up as a monolingual Mixtec speaker. After relocating in the U.S as a young adult, she worked in the fields for many \n
        // years until she had the opportunity to return to school where she obtained her GED at Aptos Adult Education in Watsonville, CA and subsequently enrolled in ESL classes to later attend Cabrillo College. Her passion \n
        // to uplift indigneous languages and increase access to trained indingeous interpreters has motivated her to become a medical assistant and complete a series of interpreting training, including a 60 hour medical training for interpreters. `}</p>;

        // const text4 = <p>{`Linda Sanchez Hernandez was born in Oaxaca, Mexico and immigrated to Orange County in her early teen years.  In 2014, she graduated from UC Berkeley where she received a dual degree in Political Science \n
        // and Chicano Studies. Her accomplishments while at UC Berkeley include advocating for and winning the first Undocumented Student Reserouce Program and co-founding the first and only UC Berkeley student housing for undocumented students.  \n
        // In 2015 she started her own social enterprise, Fuerza Indigena, to socially and economically uplift Oakland’s indigneous Mam communities. It is through this project that she realized the dire need for trained indigenous interpreters to \n
        // serve the needs of the growing indigenous monolingual speakers in the U.S. In 2019, through initial funding from American Friends Service Committee,  Linda launched Multilingual Indigenous Interpreters.  `}</p>;

        // const text5 = <p>{`Luis M. Pablo is from Todos Santos, Huehuetenango Guatemala. He grew up in Oakland, California but despite this, he was able to preserve his native tongue which he now relies on to support monolingual Mam \n
        // speakers in his life of work.  Luis currently works as a medical indigenous interpreter for La Clinica and Childrens hospital located but is also studying to become a registered court interpreter. When not at work providing language \n
        // access to his community, Luis attends Peralta Community College to obtain his Business Administration Associates degree with the objective to transfer to a four-year university. He looks forward to working with service providers and \n
        // indigenous people to give them the opportunity to have a voice and better communication. `}</p>;

        // const text6 = <p>{`Martin Pablo emigrated to Lexington, NE from Todos Santos Cuchumatan Guatemala at the age of 6. Shortly after, his family relocated permanently to Oakland CA. Martin is an ambitious young man with high aspirations \n
        // and goals that have been inspired by his parents’ hard work and sacrifices. He plans on pursuing a technology degree and a career in the tech sector upon receiving his BA from UC Davis. Witnessing the lack of language justice his \n
        // indigenous community faced in Alameda county and having played his fair share of being a child interpreter, propelled him to seek the resources and training to become a provisionally certified Mam interpreter. Martin plans to \n
        // use his skill as a trilingual speaker (Mam, Spanish, English) to close the language divide between service providers and indigenous monolingual speakers in his community.`}</p>

        // const text7 = <p>{`Rocio Hernandez Cruz is a Zapotec from Oaxaca, Mexico and a founding member of Multilingual Indigenous Interpreters. She migrated to Los Angeles, CA with her family at 11 years old and quickly mastered both English \n 
        // and Spanish while preserving her mother tongue Zapotec, from San Bartolome Quialana. Rocio has received intensive training to become an interpreter with Natividad Foundation in Salinas, CA and also plays the role of program \n
        // coordinator for Multilingual Indigenous Interpreters. She graduated from the University of California, Santa Cruz in the spring of 2020, with a major in Latin American and Latino Studies and a minor in Education. She looks forward to \n
        // helping her indigenous community as an interpreter and increased language justice for indigeous monolingual speakers.   `}</p>;

        const bios = {
            names: {
                0: 'Alejandra Matias Ramos',
                1: 'Damaso Calmo',
                2: 'Leonor Mendoza',
                3: 'Linda Sanchez Hernandez',
                4: 'Luis M. Pablo',
                5: 'Martin Pablo',
                6: 'Rocio Hernandez Cruz'
            },
            text: {
                0: <p>{`Alejandra Matias Ramos was born in Todos Santos, Guatemala to indigenous Mam parents. In 2004, her family migrated to the United States due to the increase in violence and poverty in \n 
                their motherland and eventually set their roots in Oakland, CA.Alejandra is currently pursuing a Public Health Bachelor's degree from UC Merced. Since a young age, Alejandra has played the \n
                role of an informal interpreter between her community and service providers.Now, as a trained indigenous interpreter, she seeks to be the bridge between service providers and \n
                indigneous monolingual speakers, with a focus on providing services for medical health providers and their clients.`}</p>,
                1: <p>{`Damaso Calmo is an indigenous Mam speaker who seeks to support his community by identifying their needs and meeting them. Damaso migrated to Oakland, CA in his early teens \n 
                and was able to learn English quickly in order to pursue a college degree.  Damaso gained experience as an interpreter and translator by supporting his Mam peers during the most \n
                recent influx of recent arrivals from Central America to Oakland, CA as he saw the dire need to support them and help them adjust to their new community.  He is currently working as an \n
                interpreter at La Clinic in Oakland, CA and his ongoing efforts to preserve indigenous Mayan Mam languages and traditions led him to found Desarollo Maya, an indigenous community network to uplift indignous Mayan \n
                Mam voices in Oakland.  He is passionate about increasing access to qualified and trained indigenous interpreters, and through Multilingual Indigenous Interpreters, he seeks to close gaps that currently exist.`}</p>,
                2: <p>{`Leonor Mendoza was born and raised in San Martin Peras, Oaxaca where she grew up as a monolingual Mixtec speaker. After relocating in the U.S as a young adult, she worked in the fields for many \n
                years until she had the opportunity to return to school where she obtained her GED at Aptos Adult Education in Watsonville, CA and subsequently enrolled in ESL classes to later attend Cabrillo College. Her passion \n
                to uplift indigneous languages and increase access to trained indingeous interpreters has motivated her to become a medical assistant and complete a series of interpreting training, including a 60 hour medical training for interpreters. `}</p>,
                3: <p>{`Linda Sanchez Hernandez was born in Oaxaca, Mexico and immigrated to Orange County in her early teen years.  In 2014, she graduated from UC Berkeley where she received a dual degree in Political Science \n
                and Chicano Studies. Her accomplishments while at UC Berkeley include advocating for and winning the first Undocumented Student Reserouce Program and co-founding the first and only UC Berkeley student housing for undocumented students.  \n
                In 2015 she started her own social enterprise, Fuerza Indigena, to socially and economically uplift Oakland’s indigneous Mam communities. It is through this project that she realized the dire need for trained indigenous interpreters to \n
                serve the needs of the growing indigenous monolingual speakers in the U.S. In 2019, through initial funding from American Friends Service Committee,  Linda launched Multilingual Indigenous Interpreters.  `}</p>,
                4: <p>{`Luis M. Pablo is from Todos Santos, Huehuetenango Guatemala. He grew up in Oakland, California but despite this, he was able to preserve his native tongue which he now relies on to support monolingual Mam \n
                speakers in his life of work.  Luis currently works as a medical indigenous interpreter for La Clinica and Childrens hospital located but is also studying to become a registered court interpreter. When not at work providing language \n
                access to his community, Luis attends Peralta Community College to obtain his Business Administration Associates degree with the objective to transfer to a four-year university. He looks forward to working with service providers and \n
                indigenous people to give them the opportunity to have a voice and better communication. `}</p>,
                5: <p>{`Martin Pablo emigrated to Lexington, NE from Todos Santos Cuchumatan Guatemala at the age of 6. Shortly after, his family relocated permanently to Oakland CA. Martin is an ambitious young man with high aspirations \n
                and goals that have been inspired by his parents’ hard work and sacrifices. He plans on pursuing a technology degree and a career in the tech sector upon receiving his BA from UC Davis. Witnessing the lack of language justice his \n
                indigenous community faced in Alameda county and having played his fair share of being a child interpreter, propelled him to seek the resources and training to become a provisionally certified Mam interpreter. Martin plans to \n
                use his skill as a trilingual speaker (Mam, Spanish, English) to close the language divide between service providers and indigenous monolingual speakers in his community.`}</p>,
                6: <p>{`Rocio Hernandez Cruz is a Zapotec from Oaxaca, Mexico and a founding member of Multilingual Indigenous Interpreters. She migrated to Los Angeles, CA with her family at 11 years old and quickly mastered both English \n 
                and Spanish while preserving her mother tongue Zapotec, from San Bartolome Quialana. Rocio has received intensive training to become an interpreter with Natividad Foundation in Salinas, CA and also plays the role of program \n
                coordinator for Multilingual Indigenous Interpreters. She graduated from the University of California, Santa Cruz in the spring of 2020, with a major in Latin American and Latino Studies and a minor in Education. She looks forward to \n
                helping her indigenous community as an interpreter and increased language justice for indigeous monolingual speakers.   `}</p>
            }
        }
        // const bios = [text1, text2, text3, text4, text5, text6, text7];

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
                                        <Chip name={bios.names[0]} index={0} click={this.changeBio}
                                            avatar={alejandra} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[1]} index={1} click={this.changeBio}
                                            avatar={damaso} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[2]} index={2} click={this.changeBio}
                                            avatar={leonor} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[3]} index={3} click={this.changeBio}
                                            avatar={linda} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[4]} index={4} click={this.changeBio}
                                            avatar={luis} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[5]} index={5} click={this.changeBio}
                                            avatar={martin} />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Chip name={bios.names[6]} index={6} click={this.changeBio}
                                            avatar={rocio} />
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
                                                    {bios.text[this.state.curBio]}
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
