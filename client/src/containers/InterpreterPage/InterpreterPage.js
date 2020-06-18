import React, { Component } from 'react';
import classes from './InterpreterPage.module.css'

import Grid from '@material-ui/core/Grid';
import Button from '../../components/shared/Button/Button';
import TextField from '@material-ui/core/TextField';

// import { fetchData, createAdminCode } from '../../services/AdminService';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            pastEvents: [],
            upcomingEvents: [],
        }

        this.loadData = this.loadData.bind(this);
    }

    loadData = () => {

    }

    componentDidMount() {
        this.loadData();
    }

    changeInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    submitForm = () => {
        // if (this.state.adminCode === '') {
        //     alert("Please fill out the admin code.")
        // } else {
        //     createAdminCode(this.state.adminCode)
        //         .then(data => {
        //             this.setState({ adminCode: '' });
        //         }).catch(error => {
        //             alert("Failed to create admin code.");
        //             console.log(error);
        //         })
        // }
    }

    render() {
        return (
            <div className={classes.Container}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div className={classes.menu}>
                            <h1>Events</h1>
                            <h1>Settings</h1>
                        </div>
                    </Grid>

                    <Grid item xs={8}>
                        <h1>Main</h1>
                    </Grid>
                </Grid>
            </div >
        )
    }
}

export default AdminPage;

