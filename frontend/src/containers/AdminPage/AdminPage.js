import React, { Component } from 'react';
import classes from './AdminPage.module.css'

import CertificationCard from '../../components/AdminPage/CertificationCard/CertificationCard';
import EventCard from '../../components/AdminPage/EventCard/EventCard';

import { fetchCertificates } from '../../services/AdminService';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetchCertificates()
            .then(data => {
                this.setState({ users: data })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const toValidateCertificates = this.state.users.map(user => (
            user.unvalidatedCertificates.map(certificate => (
                <CertificationCard key={`${certificate._id}`}
                    id={certificate._id}
                    avatar={user.avatar}
                    name={user.name}
                    title={certificate.title}
                    location={user.location}
                    file={certificate.file.data} />
            ))
        ))

        return (
            <div className={classes.Container} >
                <div className={classes.title}>Upcoming Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />

                <div className={classes.title}>Past Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' past />

                <div className={classes.horzLine} />

                <div className={classes.title}>New Certification Uploads</div>

                {toValidateCertificates}
            </div>
        )
    }
}

export default AdminPage;

