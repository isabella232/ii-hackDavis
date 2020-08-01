import React from 'react';
import { withRouter } from 'react-router-dom';

import { verifyAccount } from '../../services/UserService';

class AccountVerifyPage extends React.Component {
    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];

        verifyAccount(id)
            .then(data => {
                this.props.history.push('/');
            }).catch(error => {
                alert("Your Account Cannot Be Verified At The Moment.")
                this.props.history.push('/');
            })
    }

    render() {
        return null;
    }
}

export default withRouter(AccountVerifyPage);
