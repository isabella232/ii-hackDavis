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
            certificates: []
        }
    }

    componentDidMount() {
        fetchCertificates(12345)
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className={classes.Container}>
                <div className={classes.title}>Upcoming Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' />

                <div className={classes.title}>Past Events</div>
                <EventCard title='BitCard' date='2/4/2020' time='9:00 PM' past />
                <Button content="hwlloe" />

                <div className={classes.horzLine} />

                <div className={classes.title}>New Certification Uploads</div>
                <CertificationCard avatar='https://littlebeebooks.com/wp-content/uploads/2017/04/Moomin1.png'
                    name='Moomin Azkaban'
                    location='Davis, CA' />
            </div>
        )
    }
}

export default AdminPage;

