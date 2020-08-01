import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import classes from './ResetPasswordPage.module.css'

// import { resetPassword } from '../../services/UserService';

class ResetPasswordPage extends Component {
    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];

        // resetPassword(id)
        //     .then(data => {
        //         this.props.history.push('/');
        //     }).catch(error => {
        //         alert("Your Account Cannot Be Verified At The Moment.")
        //         this.props.history.push('/');
        //     })
    }

    render() {
        return <h1>hellow</h1>;
    }
}

export default withRouter(ResetPasswordPage);
