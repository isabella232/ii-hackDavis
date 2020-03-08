import React, { Component } from 'react';
import classes from './AdminPage.module.css'

import CertificationCard from '../../components/AdminPage/CertificationCard/CertificationCard';
import EventCard from '../../components/AdminPage/EventCard/EventCard';

import { fetchCertificates } from '../../services/AdminService';
import Button from '../../components/shared/Button/Button';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            pastEvents: [],
            upcomingEvents: [],
            interpreters: []
        }
    }

    componentDidMount() {
        fetchCertificates()
            .then(data => {
                this.setState({
                    pastEvents: data.pastEvents,
                    upcomingEvents: data.upcomingEvents,
                    interpreters: data.toValidate
                })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const toValidateCertificates = this.state.interpreters.map(interpreter => (
            interpreter.unvalidatedCertificates.map(certificate => (
                <CertificationCard key={`${certificate.id}`}
                    id={certificate.id}
                    avatar={interpreter.avatar}
                    name={interpreter.name}
                    title={certificate.title}
                    location={interpreter.location}
                    certificateImage={certificate.image} />
            ))
        ))
        const pastEvents = this.state.pastEvents.map(event => {
            const date = new Date(event.date);
            const parsedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            const parsedTime = `${date.getHours()}:${date.getMinutes()}`

            return <EventCard title={event.title} date={parsedDate} time={parsedTime} summary={event.summary} image={event.image} past />
        })
        const upcomingEvents = this.state.upcomingEvents.map(event => {
            const date = new Date(event.date);
            const parsedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            const parsedTime = `${date.getHours()}:${date.getMinutes()}`

            return <EventCard title={event.title} date={parsedDate} time={parsedTime} summary={event.summary} image={event.image} />
        })

        return (
            <div className={classes.Container}>
                <div className={classes.title}>Upcoming Events</div>
                {upcomingEvents.length ? upcomingEvents : <div className={classes.noEvents}>There Is No Event Coming Up.</div>}

                <div className={classes.title}>Past Events</div>
                {pastEvents.length ? pastEvents : <div className={classes.noEvents}>There Is No Past Event To Show.</div>}

                <div className={classes.buttons}>
                    <Button content='Manage All Events' inverted />
                    <Button content='New Event' />
                </div>

                <div className={classes.horzLine} />

                <div className={classes.title}>New Certification Uploads</div>

                {toValidateCertificates}
            </div >
        )
    }
}

export default AdminPage;

