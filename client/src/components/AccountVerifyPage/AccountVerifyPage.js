import React from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

import { verifyAccount } from '../../services/UserService';

class AccountVerifyPage extends React.Component {
    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];

        verifyAccount(id)
            .then(data => {
                this.props.enqueueSnackbar("Success! Your account has been verified.", { variant: 'success' });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500);
            }).catch(error => {
                this.props.enqueueSnackbar("Your account cannot be verified at the moment.", { variant: 'error' });
                setTimeout(() => {
                    this.props.history.push('/');
                }, 1500);
            })
    }

    render() {
        return null;
    }
}

export default withRouter(withSnackbar(AccountVerifyPage));
