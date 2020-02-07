import React, { Component } from 'react';
import classes from './AdminPage.module.css'

import Button from '../../components/shared/Button/Button';
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
        fetchCertificates(1234) // adminID for authentication here?
            .then(response => {
                this.setState({ users: response })
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        const toValidateCertificates = this.state.users.map(user => (
            user.unvalidatedCertificates.map(certificate => (
                <CertificationCard key={`${certificate._id}`}
                    id={certificate._id}
                    avatar='https://littlebeebooks.com/wp-content/uploads/2017/04/Moomin1.png'
                    name={user.name}
                    title={certificate.title}
                    location={user.location} />
            ))
        ))

        return (
            <div className={classes.Container} >
                <div className={classes.title}>Upcoming Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />

                <div className={classes.title}>Past Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' past />
                <Button content="hwlloe" />

                <div className={classes.horzLine} />

                <div className={classes.title}>New Certification Uploads</div>

                {toValidateCertificates}
            </div>
        )
    }
}

export default AdminPage;

