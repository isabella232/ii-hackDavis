import React, { Component } from 'react';
import classes from './AdminPage.module.css'

import CertificationCard from '../../components/AdminPage/CertificationCard/CertificationCard';
import EventCard from '../../components/AdminPage/EventCard/EventCard';
import Button from '../../components/shared/Button/Button';
import EventModal from '../../components/AdminPage/EventModal/EventModal';
import TextField from '@material-ui/core/TextField';

import { fetchData, createAdminCode } from '../../services/AdminService';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            pastEvents: [],
            upcomingEvents: [],
            interpreters: [],
            adminCode: ''
        }

        this.loadData = this.loadData.bind(this);
    }

    loadData = () => {
        fetchData()
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

    componentDidMount() {
        this.loadData();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = () => {
        if (this.state.adminCode === '') {
            alert("Please fill out the admin code.")
        } else {
            createAdminCode(this.state.adminCode)
                .then(data => {
                    alert("Successfully created admin code.");
                    this.setState({ adminCode: '' });
                }).catch(error => {
                    alert("Failed to create admin code.");
                    console.log(error);
                })
        }
    }

    copyToClipboard = () => {
        const url = process.env.REACT_APP_BACKEND_URL + "/admin/register";
        navigator.clipboard.writeText(url);
        alert("Admin Register URL Copied!");
    };

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
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                past
                reloadData={this.loadData} />
        })
        const upcomingEvents = this.state.upcomingEvents.map(event => {
            return <EventCard id={event.id}
                key={`event-${event.id}`}
                title={event.title}
                date={event.date}
                location={event.location}
                summary={event.summary}
                image={event.image}
                reloadData={this.loadData} />
        })

        return (
            <div className={classes.Container}>
                <div className={classes.title}>Upcoming Events</div>
                {upcomingEvents.length ? upcomingEvents : <div className={classes.noEvents}>There Is No Event Coming Up.</div>}

                <div className={classes.title}>Past Events</div>
                {pastEvents.length ? pastEvents : <div className={classes.noEvents}>There Is No Past Event To Show.</div>}

                <div className={classes.buttons}>
                    <Button content='Manage All Events' inverted />
                    <EventModal reloadData={this.loadData} />
                </div>

                <div className={classes.horzLine} />

                <div className={classes.title}>New Certification Uploads</div>

                {toValidateCertificates}

                <div className={classes.horzLine} />

                <div className={classes.title}>Manage Administration</div>

                <form enctype="multipart/form-data">
                    <TextField label="Admin Code"
                        name="adminCode"
                        required
                        value={this.state.adminCode}
                        margin="dense"
                        fullWidth
                        variant="outlined"
                        onChange={this.changeInput} />
                </form>

                <div className={classes.adminCodeButton}>
                    <Button content='Copy Admin Register URL' click={this.copyToClipboard} />
                    <Button content='Create Admin Code' click={this.submitForm} />
                </div>
            </div >
        )
    }
}

export default AdminPage;

